#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
./stop-all.sh
./_iso-play-shuffle.sh $QUERY_STRING 1>/dev/null 2>/dev/null &
