#!/bin/bash
cd /home/ec2-user/server
sudo apt-get update
sudo apt-get install curl
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
