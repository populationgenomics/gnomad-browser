#!/bin/bash

. ./config.sh

curl -XPUT $ES_URL/*/_settings -d '{
  "index.routing.allocation.exclude.data_node_hostname": "es-data-loading*",
  "index.routing.allocation.include.data_node_hostname": "es-data-temp*"
}'

curl -XPUT $ES_URL/_cluster/settings -d '{
    "transient" : {
        "indices.store.throttle.type" : "none",
        "indices.recovery.max_bytes_per_sec": "200mb",
        "cluster.routing.allocation.cluster_concurrent_rebalance": "5",
        "cluster.routing.allocation.enable": "all",
	"cluster.routing.allocation.node_concurrent_recoveries" : "6"
    }
}'

while [[ $(curl -s ${ES_URL}/_cat/shards | grep loading) ]] ; do
  sleep 10
  NUM_SHARDS_TO_ALLOCATE=$(curl -s ${ES_URL}/_cat/shards | grep loading | wc -l)
  echo "$(date) Transferring $NUM_SHARDS_TO_ALLOCATE shards..." ; \
done

exit 0
