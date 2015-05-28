#!/usr/bin/env bash

echo "Updating npm ..."
npm install -g npm
echo "Installing yo ..."
npm install -g grunt-cli bower yo generator-karma generator-angular
echo "Installing loopback ..."
npm install -g strongloop

echo "Finished!"
