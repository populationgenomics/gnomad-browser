#!/bin/bash

. ../config.sh

curl -XPUT $ES_URL/my-index/_settings -d '{
  "index.routing.allocation.exclude.data_node_hostname": "es-data-persistent*",
  "index.routing.allocation.include.data_node_hostname": "es-data-loading*"
}'
