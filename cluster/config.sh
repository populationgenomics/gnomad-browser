#!/bin/bash

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

export NUM_LOADING_NODES=2
export LOADING_MACHINE_TYPE=n1-highmem-4

export NUM_TEMP_NODES=5
export TEMP_MACHINE_TYPE=n1-highmem-8

export NUM_PERSISTENT_NODES=1
export PERSISTENT_MACHINE_TYPE=n1-standard-4

export ES_URL=http://localhost:8001/api/v1/namespaces/default/services/elasticsearch:9200/proxy
export EXPORT_ES_URL=10.142.0.61

# SSD or standard?
export PERSISTENT_DISK_GCE_NAME_1=gnomad-es-disk-1
export PERSISTENT_DISK_GCE_NAME_1=gnomad-es-disk-2

export SOURCE_SNAPSHOT_1=https://www.googleapis.com/compute/v1/projects/exac-gnomad/global/snapshots/TODO
export SOURCE_SNAPSHOT_2=https://www.googleapis.com/compute/v1/projects/exac-gnomad/global/snapshots/TODO

export ts=191008

############
# DATAPROC #
############

export DATAPROC_CLUSTER=gnomad-loading
export NUM_WORKERS=12
export NUM_PREEMPTIBLE_WORKERS=0
export WORKER_MACHINE_TYPE=n1-highmem-8

