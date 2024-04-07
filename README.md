# API-The-Cozy-Whisker

A restaurant API for The Cozy Whisker Cat Café.

## Running the API Node App with Docker

This guide walks you through the process of setting up and running your API Node application with Docker, including handling a PostgreSQL database container.

## Prerequisites

- Docker installed on your system
- Windows Subsystem for Linux (WSL) set up for Windows users
- Node.js and npm installed for running the Node application

## Instructions

### Setting Up Your Node Application

1. **Open a WSL terminal.**
2. **Navigate to your project directory** where the `package.json` is located.
3. Run your Node application:

   ```bash
   npm start
   ```

### Setting Up PostgreSQL with Docker

1. **Open a second WSL terminal**.
2. Build your **PostgreSQL Docker image**:

   ```bash
   docker build -t postgres_image .
   ```

3. Run your **PostgreSQL container**:

   ```bash
   docker run --name postgresql -p 5432:5432 postgres_image
   ```

### Managing Your PostgreSQL Container

- Check Running Containers: If your container stops and

  ```bash
  docker ps
  ```

  shows no running containers, follow these steps to restart it:

  3.1 List all containers (stopped and running):

  ```bash
  docker ps -a
  ```

  3.2. Find the Process ID (CONTAINER ID) of your PostgreSQL container.

  3.3. Restart the container:

  ```bash
  docker start PROCESSID

  ```

  3.4. Verify it's running:

  ```bash
  docker ps

  ```

### Commenting Out Database Creation:

- After the initial database creation, you may want to comment out the CREATE DATABASE line in your Docker setup to prevent errors on subsequent starts.

- Dropping a Database:

  - Ensure your PostgreSQL container is running, then execute:

  ```bash
  docker exec PROCESSID dropdb -U dbadmin DATABASENAME
  ```

## Starting Over with a New Docker Setup

- To remove your current Docker setup and start fresh:

  1. List all containers:

  ```bash
  docker ps -a
  ```

  2. Copy the Process ID (CONTAINER ID) of the container you wish to remove.

  3. Stop the container:

  ```bash
  docker stop PROCESSID
  ```

  4. Remove the container:

  ```bash
  docker rm PROCESSID
  ```

  5. You can now proceed with the build process again as described in the setup instructions.

# Conclusion

Follow these steps carefully to ensure a smooth setup and operation of your API Node app with Docker. Remember to substitute PROCESSID, dbadmin, and DATABASENAME with your actual process ID, database admin username, and database name, respectively.
