
# Sessions API

## Summary

This project was developed as a prerequisite in the selection process for a backend developer.
The objective of the project is to provide an API so that professionals can provide days and times for sessions, in addition, so that clients can schedule their sessions according to the available times of the professional.

## Roles

-   In order to allow our professionals to manage their availability we need a system that manages slots of time.

-   Professionals need to set which days of the week they are going to be available and interval of time for each day.

-   Each slot has a duration of 1 hour and contains two availability periods of 30 minutes, Example: a professional that is going to be available Mondays from 8am to 11am will have all this slots:

| 8:00am | 8:30am | 9:00am | 9:30am | 10:00am
|--|--|--|--|--|

-   When a customer books a session we need to block slots in order to not have conflicts with other customers trying to book sessions at the same time. Looking at the example above if a client books a session starting 8:30am, professional will not be available at 8:30am and 9:00am since every session has a 1 hour duration.

## Environment

- You can use Docker Compose to run the entire stack required for the application, if you are a docker user :whale:
More details below in the running section.
- You can also run the application directly on your computer. Just have NodeJS 12+ installed and Mongodb 4+.

## Getting Started

These instructions will get this project up and running in your machine or docker host.

### Using Docker Environment

 - Clone the project:
```sh
$ git clone git@github.com:jfranconetooo/sessions-api.git
```

 - Access the project folder
 ```sh
$ cd sessions-api
```

 - With the [docker](https://docs.docker.com/get-docker/) previously installed, just run the following command:
 ```sh
$ docker-compose up -d
```

> See the structure of the :page_facing_up:[docker-compose.yml](https://github.com/paulohenriq/Sessions-Schedule-API/blob/master/docker-compose.yml) file for more infos.

> Access to the mongodb database will be available at: `mongodb://127.0.0.1:27017/sessions`

> The host for accessing the API endpoints is: `http://127.0.0.1:4000`

> Make sure everything is working fine by accessing endpoint: `http://127.0.0.1:4000/`
> If everything went well, you will see something like:
```sh
    "Session`s develop server is running!"
```
###  Using your computer

###  Prerequisites

> [Node.js](http://nodejs.org/)

> [NPM](https://www.npmjs.com/)

> [Mongodb](https://docs.mongodb.com/manual/administration/install-community/)

### Installing

 - Clone the project:
```sh
$ git clone git@github.com:jfranconetooo/sessions-api.git
```

 - Access the project folder
 ```sh
$ cd sessions-api
```

 >:warning: change the mongodb access information using the environment variables available in `.env` :file_folder:

- Install all packages using NPM:
```sh
$ npm install
```

- To execute in Development environment:
```sh
$ npm run start:watch
```

## API and Endpoints

After your api is running access to see the openapi: `http://127.0.0.1:4000/docs`

> You can use the following postman collection [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1140279abd04cdd34f3a)

## Running the tests

- To run the project code tests with only relevant information in the terminal, use the command:
```sh
$ npm run test
```
## Approaches taked that are not outlined in requirements

- It is to schedule a session for any date.

## Future improvements and features

 - [ ] Endpoint to update availability information.
 - [ ] Validation of data before persisting on mongodb.
 - [ ] Allow exclusion of availability by slot or date.
 - [ ] Increase test cases.
 - [ ] Implement e2e tests to validate each enpoint for API.