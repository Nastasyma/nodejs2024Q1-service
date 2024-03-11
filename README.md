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
  git checkout develop
  ```
- Install NPM packages
  ```sh
  npm install
  ```

## Port

- Rename the .env.example file to .env.
- Open the .env file and set the desired port by adding the following line:
  ```sh
  PORT=4000
  ```

## Running application

```
npm start
```
or
```
npm run start:dev
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run tests

```
npm run test
```

To run only one of all test suites

```
npm run test test/albums.e2e.spec.ts
```

```
npm run test test/artists.e2e.spec.ts
```

```
npm run test test/favorites.e2e.spec.ts
```

```
npm run test test/tracks.e2e.spec.ts
```

```
npm run test test/users.e2e.spec.ts
```

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
