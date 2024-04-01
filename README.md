# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Getting Started

- Clone the repo
  ```sh
  git clone https://github.com/Nastasyma/nodejs2024Q1-service.git
  ```
- Change the directory
  ```sh
  cd nodejs2024Q1-service
  ```
- Change the branch
  ```sh
  git checkout part-3
  ```
- Install NPM packages
  ```sh
  npm install
  ```
- Create .env file (based on .env.example)
  ```sh
  cp .env.example .env
  ```

## Running application

**Warning!** Before running docker containers, clean data in Docker Desktop!

<details>
<summary>Details</summary>
 
[![How to clean/purge data][1]][1]
 
[1]: https://i.imgur.com/POvjLk1.png
 
</details>

To create and start containers

```sh
npm run docker
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.  
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run tests

```sh
npm run test:auth
npm run test:refresh
```
or
```sh
npm run docker:test
```

## Check writing logs
To check list files
```sh
docker exec -it home-library ls -ls logs
```

To see content of log file
```sh
docker exec -it home-library cat <log_filename>
# example: docker exec -it home-library cat ./logs/logs_1.log
```

## Auto-fix and format

```sh
npm run lint
```

```sh
npm run format
```

## Scanning

To run script for vulnerabilities scanning (only after `npm run docker`)

```sh
npm run docker:scan
```

## DockerHub Images

https://hub.docker.com/r/nastasyma/home-library/tags

<details>
<summary>Details</summary>
 
[![DockerHub Images][2]][2]
 
[2]: https://i.imgur.com/OaMab6K.png
 
</details>

To check images size run the command: docker images
```sh
docker images
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

<p align="right">(<a href="#readme-top">back to top</a>)</p>
