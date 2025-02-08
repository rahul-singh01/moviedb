# Dockerfile for package.json

# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:16-alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm ci)
COPY package*.json ./

# The RUN command will execute any commands in a new layer on top of the current image and commit the results.
# The resulting committed image will be used for the next step in the Dockerfile.
RUN npm ci

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app using node
CMD ["node", "server.js"]