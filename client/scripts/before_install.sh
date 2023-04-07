#!/bin/bash
cd /home/ec2-user/server
sudo yum update
sudo yum install curl
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
