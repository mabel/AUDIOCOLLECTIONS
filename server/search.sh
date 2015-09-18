#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
LIKE=`python -c "import sys, urllib as ul; print ul.unquote_plus(\"$QUERY_STRING\")"`
echo select \* from compositions where file like "'%${LIKE}%'" or image_name like "'%${LIKE}%'"\; | sqlite audio.sqlite
