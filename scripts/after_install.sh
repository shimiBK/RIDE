#!/bin/bash
cd /home/ec2-user/server/client
sudo rm -r node_modules
npm install
npm install pm2 -g

