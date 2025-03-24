# Dockerfile for package.json
# Multi-stage build to keep the final image small

# Stage 1: Build the application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Production environment
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]