# Comparison tool

A simple app to compare temperature and energy consumption data in a dual axis line graph.

## Prerequisites

- Install [node.js 18](https://nodejs.dev/download)
- Install [docker](https://docs.docker.com/get-docker/)
- Install [docker-compose](https://docs.docker.com/compose/install/)

## Running

### Docker

**Requires docker to be installed and running!**

The easiest way to run the application is to use the provided docker-compose file to run the frontend and backend applications together:

- Run the container from the root directory of the projext `docker-compose up --build`

### Local

#### Backend

- To run the backend, from the root directory of the project run the following:
   - `cd backend` 
   - `npm install`
   - `npm run start:dev`
- This will run the server on `http://localhost:8080` and you will be able to hit the `/tempsAndEnergy` endpoint to retrieve the relevant data

#### Frontend

**In order to run the frontend succesfully you will need to have the backend running prior to starting the frontend application**

- To run the frontend, from the root directory of the project run the following:
  - `cd frontend`
  - `npm i`
  - `npm start`
- This will run the React application on `http://localhost:3000` and you will be able to 
