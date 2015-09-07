#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
amixer sset 'Master' $QUERY_STRING
IS_MUTED=`amixer sget 'PCM' | grep '\[0%\]'`
if [ -z "$IS_MUTED" ]; then
	amixer sset 'PCM' 'mute' 1>/dev/null 2>/dev/null
	echo 0
else
	amixer sset 'PCM' 'unmute' 1>/dev/null 2>/dev/null
	echo 1
fi
