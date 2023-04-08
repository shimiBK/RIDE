#!/bin/bash
cd /var/www/html/RIDEDM/client
sudo npm install
sudo npm install pm2 -g
cd ../api
sudo npm install
npm install forever -g
