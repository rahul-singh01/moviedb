# Dockerfile for package.json

# Stage 1: Build
# Use a node base image for building the application
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Stage 2: Production
# Use a lighter node base image for running the application
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the installed dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the application code from the build stage
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]