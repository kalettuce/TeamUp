#!/usr/bin/env bash
# Make sure this file has Unix line endings

if pushd $(dirname $0); then
  npm run test -- --watchAll=false && npm run build
  popd
fi
