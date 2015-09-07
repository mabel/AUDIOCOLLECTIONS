#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
find ../htdocs/ru.yababay.files/binary_multimedia_files/ -name '*.iso' | grep -v 'Клипарт' | sort


