FROM node:18-alpine
WORKDIR /app
COPY prisma doc ./
RUN npm ci && prisma generate && prisma migrate dev && npm cache clean --force
COPY --chown=node:node . .
CMD ["npm", "run", "start:dev"]