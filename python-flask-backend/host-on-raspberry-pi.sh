#!/usr/bin/env bash

/usr/bin/python /home/aron/szakdolgozat-raspberry-pi/py-part/indicate_raspi_on.py &

docker run -d -p 5000:5000 webdevapp

# Give the container a moment to start up.
sleep 10

/usr/local/bin/ngrok http --url=hippo-immense-plainly.ngrok-free.app 5000 &
