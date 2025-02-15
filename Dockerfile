# Dockerfile for package.json
# Use a multi-stage build to create a smaller final image

# First stage: Build and install dependencies
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Second stage: Create the final image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the installed dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]