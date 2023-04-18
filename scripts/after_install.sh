#!/bin/bash
cd /var/www/html/RIDEDM/client
sudo rm -rf node_modules
npm install
npm install pm2 -g
cd ../api
sudo rm -rf node_modules
npm install
npm install forever -g
cd ../socket
sudo rm -rf node_modules
npm install
npm install forever -g
