# Stage 1: Build Stage
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Production Stage
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy dependencies from the build stage
COPY --from=build /app/node_modules /app/node_modules

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]