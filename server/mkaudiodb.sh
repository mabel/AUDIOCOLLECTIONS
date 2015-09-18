#!/bin/sh
echo "drop table iso_images;"
echo "create table iso_images (id int, file text);"
echo "drop table compositions;"
echo "create table compositions (image_pos int, skip int, count int, file text, image_name text);"
POS=0
find ../htdocs/ru.yababay.files/binary_multimedia_files/ -name '*.iso' | grep -v 'Клипарт' | sort | while read l
do
	echo insert into iso_images values \($POS, \"$l\"\)\;
	xorriso -indev "$l" -find / -name "*.mp3" -exec report_lba 2>/dev/null | \
	egrep '^File' | \
	sed "s/'//g"  | sed 's/"//g' | \
	awk -v "iso_pos=$POS" 'BEGIN {FS=","} {print "insert into compositions values("iso_pos", "$2", "$3", \""substr($0, 54)"\", null);"}'
	echo update compositions set image_name = \"`echo $l | egrep -o '[^\/]+$' | sed 's/.iso//'`\" where image_pos=$POS\;
	POS=$(($POS + 1))
done

