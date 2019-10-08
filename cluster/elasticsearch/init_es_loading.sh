#!/bin/bash

. ../config.sh

echo $ES_URL

curl -XPUT $ES_URL/_cluster/settings -d '{
    "transient" : {
        "indices.store.throttle.type" : "none",
        "indices.recovery.max_bytes_per_sec": "200mb",
        "indices.store.throttle.max_bytes_per_sec" : "200mb",
        "cluster.routing.allocation.cluster_concurrent_rebalance": "5",
        "cluster.routing.allocation.enable": "all",
	"cluster.routing.allocation.node_concurrent_recoveries" : "2"
    }
}'
