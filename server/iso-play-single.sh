#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
ISO_POS=`echo $QUERY_STRING | awk 'BEGIN {FS="&"} {print $1}'`
DD_ARGS=`echo $QUERY_STRING | awk 'BEGIN {FS="&"} {print "skip="$2" count="$3}'`
#ISO_IMG="`find ../htdocs/ru.yababay.files/binary_multimedia_files/ -name '*.iso' | sort | head -n $ISO_POS | tail -n 1`"
ISO_IMG="`echo select file from iso_images where id=$ISO_POS \; | sqlite audio.sqlite`"
killall mpg123
rm -f *.mp3
echo "if=\"$ISO_IMG\" $DD_ARGS" | xargs dd bs=2048 | mpg123 /dev/stdin 1>/dev/null 2>err &
echo OK

