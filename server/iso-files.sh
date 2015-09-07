#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
ISO_IMG="`find ../htdocs/ru.yababay.files/binary_multimedia_files/ -name '*.iso' | grep -v '' | sort | head -n $QUERY_STRING | tail -n 1`"
if [ -n "$ISO_IMG" ]; then
	xorriso -indev "$ISO_IMG" -find / -name "*.mp3" -exec report_lba | shuf | egrep '^File data' | sed -r "s/^[^,]+[, ]+([0-9]+)[, ]+([0-9]+)[^\/]+(\/.+)(.$)/\1 \2 \3/" | egrep -v '^File' 
else
	echo ERR
fi

