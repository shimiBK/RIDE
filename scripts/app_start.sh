#!/bin/bash
cd /home/ec2-user/server/client
pm2 start ./node_modules/react-scripts/scripts/start.js --name "marketing" --watch
pm2 startup
pm2 save
pm2 restart all
