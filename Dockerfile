# Stage 1: Install dependencies
FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Stage 2: Copy application code and build the application
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]