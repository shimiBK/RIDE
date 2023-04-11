#!/bin/bash
cd /var/www/html/RIDEDM/client
pm2 start npm -- start
cd ../api
forever start --minUptime 1000 --spinSleepTime 1000 index.js
