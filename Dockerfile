# Stage 1: Build stage
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Production stage
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy all built files from the build stage
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]