#!/bin/bash
cd /var/www/html/
git pull
cd /RIDEDM/client
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
