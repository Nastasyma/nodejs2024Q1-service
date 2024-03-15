FROM node:18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY prisma doc ./
RUN npm ci && npx prisma generate && npm cache clean --force
COPY --chown=node:node . .
CMD ["npm", "run", "start:dev"]