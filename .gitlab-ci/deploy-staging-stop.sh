#!/usr/bin/env sh

set -e

DIRECTORY=/srv/gitlab-ci/$STAGING_DOMAIN

echo "Go to $DIRECTORY"
cd $DIRECTORY

echo "Stopping and deleting containers"
docker-compose down --remove-orphans

echo "Removing files"
cd ..
rm -r $STAGING_DOMAIN
