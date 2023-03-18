#!/bin/bash                                                                                                                                                                                                     
# exit when any command fails
set -e

# Run relative to the location of this script.
cd "$(dirname "$(readlink -f "$0")")"

# Build and publish this project to NPM.
rm -Rdf ./dist/*
yarn build
chmod +x ./dist/index.js
npm publish --access public
