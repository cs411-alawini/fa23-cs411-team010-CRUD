#!/bin/bash

# Prompt for database details with default values
# shellcheck disable=SC2162
read -p "Enter database host (default: localhost): " db_host
db_host=${db_host:-localhost}

read -p "Enter database user (default: root): " db_user
db_user=${db_user:-root}

read -sp "Enter database password: " db_password
db_password=${db_password:-123456}
echo

read -p "Enter database name: " db_name
db_name=${db_name:-team10}

export DB_HOST=$db_host
export DB_USER=$db_user
export DB_PASSWORD=$db_password
export DB_NAME=$db_name

cd backend
npm install

cd ../frontend
npm install

sudo systemctl start nginx

