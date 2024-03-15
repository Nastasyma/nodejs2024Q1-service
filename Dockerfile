FROM node:20.11-alpine3.19

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci && npm cache clean --force

COPY . .

CMD [ "npm", "run", "start:home-library" ]
