#!/bin/bash

#install packages
sudo apt install curl

curl -sL https://deb.nodesource.com/setup_10.x | sudo bash - sudo apt-get install -y nodejs

sudo npm install pm2@latest -g

#pull app files from github
git clone https://github.com/BlakeWo/gate_cit_481 


