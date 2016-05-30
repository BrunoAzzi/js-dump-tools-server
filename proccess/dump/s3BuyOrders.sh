#!/bin/bash

_START_DATE="2015-12-08"
_END_DATE="2016-01-08"
API_KEY="atualcard"

_cur_date="$_START_DATE"
i=0

while [[ "$_cur_date" < "$_END_DATE" ]]; do
 _cur_date="`date -d "$_START_DATE +$i day" +'%Y-%m-%d'`"
 set -- `echo $_cur_date | sed 's/\-/ /g'`
 _YEAR=$1
 _MONTH=$2
 _DAY=$3

 s4cmd get s3://platform-dumps-virginia/buyOrders/$1-$2-$3/$API_KEY.gz ./$API_KEY.gz
 mv ./$API_KEY.gz ./$API_KEY\($i\).gz

 i=$((i+1))
done

zcat * > $API_KEY
