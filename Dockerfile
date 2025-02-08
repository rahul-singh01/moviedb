# Dockerfile for package.json

# Use an official Node runtime as a parent image
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (if there's a build step)
# RUN npm run build

# Use a smaller base image for the final stage
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the dependencies and built application from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]