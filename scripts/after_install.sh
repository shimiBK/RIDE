#!/bin/bash
cd /var/www/html/RIDEDM/client
npm install
npm install --save react-scripts
npm install pm2 -g
cd ../api
sudo rm -r node_modules
npm install
npm install forever -g
cd ../socket
sudo rm -r node_modules
npm install
npm install forever -g
