#/bin/bash

CURR_DIR=`pwd`

echo Current dir is $CURR_DIR

docker run \
  --name mariadb \
  -p:3306:3306 \
  -v $CURR_DIR:/var/lib/mysql \
  -e MYSQL_USER=mariadb \
  -e MYSQL_PASSWORD=mariadb \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=investmentdb \
  -d \
  mariadb
