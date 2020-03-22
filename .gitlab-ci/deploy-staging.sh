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

echo PORT=3000 >> .env
echo MODE=DEV >> .env
echo RUN_MIGRATIONS=true >> .env
echo DATABASE_HOST=db >> .env
echo DATABASE_PORT=5432 >> .env
echo DATABASE_NAME=home_alone >> .env
echo DATABASE_USER=home_alone >> .env
echo DATABASE_PASSWORD=$DATABASE_PASSWORD >> .env

echo "Pulling images"
docker-compose --project-name $STAGING_DOMAIN pull --parallel

echo "Starting containers"
docker-compose --project-name $STAGING_DOMAIN up -d --remove-orphans

sleep 20

echo "reset db"
docker-compose --project-name $STAGING_DOMAIN run backend npm run typeorm:drop
docker-compose --project-name $STAGING_DOMAIN run backend npm run typeorm:sync
docker-compose --project-name $STAGING_DOMAIN run backend curl http://localhost:3000/sync\?key\=onlygitlabmaydeploy

