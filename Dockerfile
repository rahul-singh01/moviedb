# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Stage 2: Production
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --only=production

COPY --from=build /app .

EXPOSE 3000

CMD ["node", "index.js"]