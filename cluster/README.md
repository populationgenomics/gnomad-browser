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
kubectl apply -f kube/es-discovery-svc.yaml
kubectl apply -f kube/es-svc.yaml
kubectl apply -f kube/es-master.yaml
sleep 20
kubectl apply -f kube/es-client.yaml
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

`kubectl apply -f kube/es-loading/es-loading-deployment.yaml`

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

...

## Transfer shards to a smaller pool of temp nodes (optional)

Create a temporary node pool and transfer the new shards off the large loading cluster. 

The total disk size should be set to accommodate the new indices.

### Create fresh set of temp disks

```
gcloud beta compute disks create es-temp-1 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=1000GB \
--zone=$GCLOUD_ZONE &
gcloud beta compute disks create es-temp-2 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=1000GB \
--zone=$GCLOUD_ZONE &
gcloud beta compute disks create es-temp-3 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=1000GB \
--zone=$GCLOUD_ZONE &
gcloud beta compute disks create es-temp-4 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=1000GB \
--zone=$GCLOUD_ZONE &
gcloud beta compute disks create es-temp-5 \
--project=$GCLOUD_PROJECT \
--type=pd-standard \
--size=1000GB \
--zone=$GCLOUD_ZONE

kubectl apply -f kube/es-temp/es-temp-pv.yaml
```

`NUM_TEMP_NODES` should match the number of replicas in `es-temp-deployment.yaml`.

```
gcloud beta container node-pools create elastictemp  \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE \
--num-nodes $NUM_TEMP_NODES \
--machine-type $TEMP_MACHINE_TYPE

kubectl apply -f kube/es-temp/es-temp-statefulset.yaml
```

Start transfering the shards

`./reallocate-temp.sh`

When done transfering, veryify no more shards on loading nodes and delete them:

```
kubectl delete -f kube/es-loading/es-loading-statefulset.yaml

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
--storage-location=us &
gcloud beta compute disks snapshot es-temp-2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-2-$ts \
--storage-location=us &
gcloud beta compute disks snapshot es-temp-3 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-3-$ts \
--storage-location=us &
gcloud beta compute disks snapshot es-temp-4 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-4-$ts \
--storage-location=us &
gcloud beta compute disks snapshot es-temp-5 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=es-temp-5-$ts \
--storage-location=us 
```

## Transfer shards from temp disks to production disks

### Snapshots the current gnomAD production cluster disks

```
gcloud beta compute disks snapshot gnomad-es-disk-3 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=gnomad-es-disk-3-$ts \
--storage-location=us &
gcloud beta compute disks snapshot gnomad-es-disk-4 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=gnomad-es-disk-4-$ts \
--storage-location=us 
```

### Create disks from those snapshots

Decide what kind of storage to use, make sure it matches the pv files.

```
gcloud beta compute disks create gnomad-es-disk-1 \
--project=$GCLOUD_PROJECT \
--type=pd-ssd \
--size=4250GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=gnomad-es-disk-3-$ts \
--physical-block-size=4096 &
gcloud beta compute disks create gnomad-es-disk-2 \
--project=$GCLOUD_PROJECT \
--type=pd-ssd \
--size=4250GB \
--zone=$GCLOUD_ZONE \
--source-snapshot=gnomad-es-disk-4-$ts \
--physical-block-size=4096 
```

Deploy persistent nodes/pods

```
gcloud beta container node-pools create elasticpersistent \
--cluster $CLUSTER_NAME \
--zone $GCLOUD_ZONE \
--num-nodes $NUM_PERSISTENT_NODES \
--machine-type $PERSISTENT_MACHINE_TYPE

kubectl apply -f kube/es-persistent/es-persistent-pv.yaml
kubectl apply -f kube/es-persistent/es-persistent-statefulset.yaml
```

`./reallocate-persistent.sh`

Snapshot persistent disks with new data

```
gcloud beta compute disks snapshot gnomad-es-disk-1 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=gnomad-es-disk-1-$ts \
--storage-location=us &
gcloud beta compute disks snapshot gnomad-es-disk-2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE \
--snapshot-names=gnomad-es-disk-2-$ts \
--storage-location=us
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
--zone=$GCLOUD_ZONE &
gcloud -q beta compute disks delete es-temp-2 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE &
gcloud -q beta compute disks delete es-temp-3 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE &
gcloud -q beta compute disks delete es-temp-4 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE &
gcloud -q beta compute disks delete es-temp-5 \
--project=$GCLOUD_PROJECT \
--zone=$GCLOUD_ZONE
```
