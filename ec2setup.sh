#!/bin/bash

#install packages

apt install curl -y

#installs Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node -y

#install npm nodes in project directory

npm install

#installs PM2 so auto restarts on server restart
npm install -g pm2

cd src

pm2 start App.js

pm2 startup

cd ..

#install yarn
npm install yarn -g

yarn

#starts server
yarn start


