# Loading large datasets 

`source config.sh`

`cd elasticsearch`

## Create a new cluster

```
gcloud container clusters create $CLUSTER_NAME \
--machine-type $CLUSTER_DEFAULT_MACHINE_TYPE \
--zone $GCLOUD_ZONE \
--num-nodes $NUMBER_DEFAULT_NODES \
--project $GCLOUD_PROJECT
```

Deploy elasticsearch

```
kubectl create -f kube/es-discovery-svc.yaml
kubectl create -f kube/es-svc.yaml
kubectl create -f kube/es-master.yaml
sleep 20
kubectl create -f kube/es-client.yaml
```

## Load data

### Create loading nodes and pods

`NUM_LOADING_NODES` should match the number of replicas in `es-loading-deployment.yaml`

The `ES_JAVA_OPTS` setting in `es-loading-deployment.yaml` should be set to half the total memory of each node.

```
- name: "ES_JAVA_OPTS"
  value: "-Xms30g -Xmx30g"
```

Create the loading node pool and deploy the pods.

```
gcloud beta container node-pools create elastic-loading  \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE \
--num-nodes $NUM_LOADING_NODES \
--machine-type $LOADING_MACHINE_TYPE \
--local-ssd-count 1 
```

`kubectl create -f kube/es-loading/es-loading-deployment.yaml`

Configure elasticsearch:

`./init_es_loading.sh`

### Prepare HT

Create dataproc cluster

```
hailctl dataproc start $DATAPROC_CLUSTER \
  --num-workers=$NUM_WORKERS \
  --num-preemptible-workers=$NUM_PREEMPTIBLE_WORKERS \
  --worker-machine-type=$WORKER_MACHINE_TYPE \
  --zone=$GCLOUD_ZONE
```

```
gcloud dataproc jobs submit pyspark \
  --cluster=$(DATAPROC_CLUSTER) \
  ../projects/gnomad/data/prepare_my_file.py -- \
  --file=my-file.ht
```


### Submit loading script

Create dataproc cluster

```
hailctl dataproc start $DATAPROC_CLUSTER \
  --num-workers=$NUM_WORKERS \
  --num-preemptible-workers=$NUM_PREEMPTIBLE_WORKERS \
  --worker-machine-type=$WORKER_MACHINE_TYPE \
  --zone=$GCLOUD_ZONE
```

Submit loading script

```
gcloud dataproc jobs submit pyspark \
  --cluster=$(DATAPROC_CLUSTER) \
  ../projects/gnomad/data/load_my_file.py -- \
  --file=my-file.ht
```

### Monitor loading in Stackdriver

## Transfer shards to a smaller pool of temp nodes (optional)

We could transfer the new shards directly to the production disks. However, shard transfer to a small number of disks can be slow. Here, we create an intermediate node pool (called temp nodes) so that we can get the shards off the massive loading cluster faster and take that down. We could skip this step, but I find it's useful.

The total disk size should be set to accommodate the the index you just loaded.

### Create fresh set of temp disks

```
gcloud beta compute disks create es-temp-1 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE & \
gcloud beta compute disks create es-temp-2 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE & \
gcloud beta compute disks create es-temp-3 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE & \
gcloud beta compute disks create es-temp-4 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE & \
gcloud beta compute disks create es-temp-5 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE

kubectl create -f kube/es-temp/es-temp-pv.yaml
```

`NUM_TEMP_NODES` should match the number of replicas in `es-temp-deployment.yaml`.

Deploy elasticsearch

```
gcloud beta container node-pools create elastictemp  \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE \
--num-nodes $NUM_TEMP_NODES \
--machine-type $TEMP_MACHINE_TYPE

kubectl create -f kube/es-temp/es-temp-pv.yaml

sleep 20
kubectl create -f kube/es-temp/es-temp-statefulset.yaml
```

Start transfering the shards

`./reallocate-temp.sh`

When done transfering, veryify no more shards on loading nodes and delete them:

```
kubectl delete -f kube/es-temp/es-temp-statefulset.yaml

sleep 120

gcloud -q beta container node-pools delete elasticloading \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE
```

Snapshot the temp nodes

```
gcloud beta compute disks snapshot es-temp-1 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-1-$ts \
--storage-location=us & \
gcloud beta compute disks snapshot es-temp-2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-2-$ts \
--storage-location=us & \
gcloud beta compute disks snapshot es-temp-3 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-3-$ts\
--storage-location=us & \
gcloud beta compute disks snapshot es-temp-4 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-4-$ts \
--storage-location=us & \
gcloud beta compute disks snapshot es-temp-5 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-5-$ts \
--storage-location=us  \
```

## Transfer shards from temp disks to production disks

### Snapshots the current gnomAD production cluster disks

```
gcloud beta compute disks create $PERSISTENT_DISK_GCE_NAME_1 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=$SOURCE_SNAPSHOT_1 \
--physical-block-size=4096

gcloud beta compute disks create $PERSISTENT_DISK_GCE_NAME_2 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=$SOURCE_SNAPSHOT_2 \
--physical-block-size=4096 
```

### Create disks from those snapshots

Decide what kind of storage to use, make sure it matches the PV files

```
gcloud beta compute disks create $PERSISTENT_DISK_GCE_NAME_1 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=$SOURCE_SNAPSHOT_1 \
--physical-block-size=4096

gcloud beta compute disks create $PERSISTENT_DISK_GCE_NAME_2 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=3000GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=$SOURCE_SNAPSHOT_2 \
--physical-block-size=4096 
```

Deploy persistent nodes/pods

```
gcloud beta container node-pools create elasticpersistent \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE \
--num-nodes $NUM_PERSISTENT_NODES \
--machine-type $PERSISTENT_MACHINE_TYPE

kubectl create -f kube/es-persistent/es-gnomad-pv.yaml

sleep 10
kubectl create -f kube/es-persistent/es-data-svc.yaml
kubectl create -f kube/es-persistent/es-data-persistent.yaml
```

`./reallocate-persistent.sh`

Snapshot persistent disks with new data

```
gcloud beta compute disks snapshot $PERSISTENT_DISK_GCE_NAME_1 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-1-$ts \
--storage-location=us

gcloud beta compute disks snapshot $PERSISTENT_DISK_GCE_NAME_2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=$PERSISTENT_DISK_GCE_NAME_2-$ts \
--storage-location=us & \
```

### Clean up temp nodes/disks

```	
kubectl delete -f kube/es-temp/es-data-temp.yaml
sleep 300
kubectl delete -f kube/es-temp/es-temp-disks.yaml

kubectl delete pvc storage-es-data-temp-0
kubectl delete pvc storage-es-data-temp-1 
kubectl delete pvc storage-es-data-temp-2 
kubectl delete pvc storage-es-data-temp-3 
kubectl delete pvc storage-es-data-temp-4 

gcloud -q beta container node-pools delete elastictemp \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE

kubectl delete -f kube/es-temp/es-temp-disks.yaml
gcloud -q beta compute disks delete es-temp-1 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE & \
gcloud -q beta compute disks delete es-temp-2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE & \
gcloud -q beta compute disks delete es-temp-3 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE & \
gcloud -q beta compute disks delete es-temp-4 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE & \
gcloud -q beta compute disks delete es-temp-5 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE
```
