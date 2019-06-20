#!/bin/bash

CURRENT_DIR=`pwd`
echo $CURRENT_DIR
sudo docker run -it \
	-p 34000:3000 -p 34001:3001 -p 8180:8080 \
        -p 8645:8545 -p 9645:9545 \
        -v $CURRENT_DIR:/home/node/project \
	sirhill/truffle

