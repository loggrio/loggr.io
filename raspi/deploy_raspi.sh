#!/bin/bash
#
# Shell script to deploy raspi files to raspberry pi
#

if [ $# -eq 0 ]
  then
    echo "Missing argument"
    echo "Usage: ./deploy_raspi.sh <ip-address-of-your-raspi>"; exit 1
elif [ $# -gt 1 ]
  then
    echo "Too much arguments"
    echo "Usage: ./deploy_raspi.sh <ip-address-of-your-raspi>"; exit 2
fi

IP=$1
TARGET=pi@$IP:/home/pi/Coding/loggr.io/raspi

SENSORS="sensors/*.c sensors/Makefile"
PYTHON_UTILS="raspi_loggr/*.py"
GENERAL="requirements.txt run.py"

echo "Shell script to copy raspi files to raspberry pi"
echo "Continue? [y/n]"
read ANSWER
if [ $ANSWER == "n" -o $ANSWER == "N" -o $ANSWER == "no" ]
  then exit 3
elif [ $ANSWER == "y" -o $ANSWER == "Y" -o $ANSWER == "yes" ]
  then
    scp -r $SENSORS $TARGET/sensors
    scp -r $PYTHON_UTILS $TARGET/raspi_loggr
    scp -r $GENERAL $TARGET
    exit 0
else echo "Invalid answer, exit."; exit 4
fi
