# Stage 1: Build
FROM node:14-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the dependencies and project files from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app using node
CMD ["node", "index.js"]