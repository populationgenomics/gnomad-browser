#!/bin/bash -eu

####################
# GCLOUD SETTINGS #
####################

export GCLOUD_PROJECT=exac-gnomad
export GCLOUD_ZONE=us-east1-d
export GCLOUD_REGION=us-east1

##################
# SERVER CLUSTER #
##################

export CLUSTER_NAME=gnomad-prod

export CLUSTER_DEFAULT_MACHINE_TYPE=n1-standard-4
export NUMBER_DEFAULT_NODES=1

#################
# ELASTICSEARCH #
################# 

export NUM_LOADING_NODES=48
export LOADING_MACHINE_TYPE=n1-highmem-8

export NUM_TEMP_NODES=5
export TEMP_MACHINE_TYPE=n1-highmem-8

export NUM_PERSISTENT_NODES=2
export PERSISTENT_MACHINE_TYPE=n1-highmem-8

export ES_URL=http://localhost:8001/api/v1/namespaces/default/services/elasticsearch:9200/proxy
export EXPORT_ES_URL=192.168.0.7 

export ts=191010

############
# DATAPROC #
############

export DATAPROC_CLUSTER=gnomad-loading
export NUM_WORKERS=2
export NUM_PREEMPTIBLE_WORKERS=0
export WORKER_MACHINE_TYPE=n1-highmem-8

