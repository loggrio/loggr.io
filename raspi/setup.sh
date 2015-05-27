#!/usr/bin/env bash
echo "Shell script to set up a new Raspberry Pi"

echo "Update and upgrade apt-get..."
sudo apt-get update && sudo apt-get upgrade

echo "Install basics, e.g. pip..."
sudo apt-get install python-pip
sudo apt-get install python-dev

echo "Install VIM and load a simple vimrc..."
sudo apt-get install vim
git clone git://github.com/amix/vimrc.git ~/.vim_runtime
sh ~/.vim_runtime/install_basic_vimrc.sh

echo "Set up directory structure..."
cd
mkdir -p Coding/loggr.io/raspi && mkdir $_/raspi_loggr $_/sensors

echo "Install libraries..."
sudo pip install --upgrade enum34
sudo pip install --upgrade requests
sudo pip install --upgrade netifaces

cd
cd Coding/loggr.io/raspi/
echo "-- Finished! --"
echo "Next steps: "
echo "Deploy relevant files to your raspberry by executing ./deploy_raspi.sh <IP-of-your-raspi> on your Mac or PC"
echo "After that change into directory ~/Coding/loggr.io/raspi/sensors and start make to compile all your .c-files"
