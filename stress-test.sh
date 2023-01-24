#!/bin/bash
target=${1:-http://localhost:3001/user}
while true
do
  for i in $(seq 100) #100 times
  do 
     curl $target > /dev/null &
   done

   wait  
done