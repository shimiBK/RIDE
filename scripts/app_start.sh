#!/bin/bash
cd /home/ec2-user/server/client
npm start
pm2 start npm --name "covidapp" -- start
pm2 startup
pm2 save
pm2 restart all
cd ../api
forever start --minUptime 1000 --spinSleepTime 1000 index.js
cd ../socket
forever start --minUptime 1000 --spinSleepTime 1000 index.js
