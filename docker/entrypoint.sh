#!/bin/sh
set -e

echo "# ####################### #"
echo "#     install packages    #"
echo "# ####################### #"
npm install

exec "$@"