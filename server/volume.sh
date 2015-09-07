#!/bin/sh
echo "Content-Type: text/plain; charset=utf-8"
echo 
amixer sset 'PCM' "$QUERY_STRING%"
echo OK
