#!/bin/sh
ISO_IMG="`find ../htdocs/ru.yababay.files/binary_multimedia_files/ -name '*.iso' | grep -v 'Клипарт' | sort | head -n $1 | tail -n 1`"
xorriso -indev "$ISO_IMG" -find / -name "*.mp3" -exec report_lba | shuf | \
	egrep '^File data' | \
	sed -r "s/^[^,]+[, ]+([0-9]+)[, ]+([0-9]+)[^\/]+(\/.+)(.$)/\1 \2 \3/" | \
	egrep -v '^File' | while read l; 
	do
		DD_ARGS=`echo $l | awk '{print "skip="$1" count="$2}'`
		echo "if=\"$ISO_IMG\" $DD_ARGS" | xargs dd bs=2048 | mpg123 /dev/stdin
	done

