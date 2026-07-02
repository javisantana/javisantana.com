#!/bin/bash -x
cd "$(dirname "$0")"
scp root@37.27.183.246:/var/www/lbrl.engineering/events.duckdb events.duckdb
grok --yolo -p "read the file prompt.md and follow the instructions"
