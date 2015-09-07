#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
ps ax | grep [m]pg123 | wc -l

