# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## Downloading

Repository
```
git clone https://github.com/AlexXG0152/NodeJS-REST-Service
```

Dockerfile
```
docker pull alemdnfhs/nodejs-rest-service-app
```

## Installing NPM modules

(for app local running without Docker/database)
```
npm install 
```

## Running application

DOCKER:
```
docker-compose up -d
```

or 
```
docker build -t nodejs-rest-service-app .
```

LOCAL:
```
npm start
```

After starting the app on port (4000 as default).

## Stoppeng application

DOCKER:
```
docker-compose down --volumes
```


## Scan

Before scanning images you need to login into DockerHub by command docker login

```
docker scan nodejs-rest-service-app:latest
```

## Testing

I'm added postman quries collection - so you can use postman to test and check how it works.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
