#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
PID=`ps ax | grep [_]iso-play | egrep -o '^([ ]+)?[0-9]+'`
if [ -n "$PID" ]; then
	kill $PID
fi
killall mpg123 1>/dev/null 2>/dev/null 
echo OK

