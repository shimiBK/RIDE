#!/bin/bash
cd /home/ec2-user/server/client
npm start
pm2 start npm -- start
