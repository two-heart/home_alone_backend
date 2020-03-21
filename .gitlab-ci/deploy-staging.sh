#!/usr/bin/env sh

set -e

DIRECTORY=/srv/gitlab-ci/$STAGING_DOMAIN

echo "Deleting old directory"
rm -rf $DIRECTORY

mkdir -p $DIRECTORY
cp docker-compose.prod.yml $DIRECTORY/docker-compose.yml

echo "Go to $DIRECTORY"
cd $DIRECTORY

echo ENTRYPOINT=$ENTRYPOINT >> .env
echo STAGING_DOMAIN=$STAGING_DOMAIN  >> .env
echo IMAGE_TAG_BACKEND=$IMAGE_TAG_BACKEND >> .env

echo "Pulling images"
docker-compose --project-name $STAGING_DOMAIN pull --parallel

echo "Starting containers"
docker-compose --project-name $STAGING_DOMAIN up -d --remove-orphans
