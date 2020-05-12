#!/bin/bash
# Create hash folder name
BUILD_FOLDER=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 24 | head -n 1)
# Build client
./node_modules/webpack/bin/webpack.js --mode production --env.file=production --env.folder=$BUILD_FOLDER
# Check successful build
if [ -d "./build-tmp/$BUILD_FOLDER/client" ]; then
  # Create link
  ln -sfn ./build-tmp/$BUILD_FOLDER build
  # Remove old build-temp
  find build-tmp/* -maxdepth 0 ! -name $BUILD_FOLDER -type d -exec rm -rf {} +
  echo -e "\n\e[0;32m $(tput bold) New link created, old folders deleted.\e[0m\n"
else
  echo -e "\n\e[0;31m $(tput bold) New folders not found, break link creation!\e[0m\n"
fi
