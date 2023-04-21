#!/bin/bash
cd /home/ec2-user/server/client
sudo yum update
sudo yum install curl
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo yum install -y nodejs
