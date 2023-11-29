#!/bin/bash

# Prompt for database details with default values
# shellcheck disable=SC2162
read -p "Enter database host (default: localhost): " db_host
db_host=${db_host:-localhost}

read -p "Enter database user (default: root): " db_user
db_user=${db_user:-root}

read -sp "Enter database password: " db_password
echo

read -p "Enter database name: " db_name

# Export database details as environment variables
export DB_HOST=$db_host
export DB_USER=$db_user
export DB_PASSWORD=$db_password
export DB_NAME=$db_name


# Navigate to the backend directory
# shellcheck disable=SC2164
cd backend

# Install backend dependencies
npm install

# Run the backend server using nodemon, with environment variables
nodemon app.js &

# Navigate to the frontend directory
# shellcheck disable=SC2164
cd ../frontend

# Install frontend dependencies
npm install

# Run the frontend development server
npm run dev &

# Open the application in the browser
open http://localhost:5173