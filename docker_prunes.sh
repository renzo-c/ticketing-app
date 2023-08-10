#!/bin/bash

# Run the docker commands and echo "y" as input
echo "y" | docker system prune -a

# Only system prune should be enough, let's see...
echo "y" | docker container prune
echo "y" | docker image prune -a