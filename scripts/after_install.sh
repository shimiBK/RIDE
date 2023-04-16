#!/bin/bash
cd /var/www/html/RIDEDM/client
npm install --save react react-dom react-scripts
sudo npm install
sudo npm install pm2 -g
cd ../api
sudo rm -rf node_modules
sudo npm install
sudo npm install forever -g
cd ../socket
sudo rm -rf node_modules
sudo npm install
sudo npm install forever -g
