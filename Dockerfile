# Stage 1: Build
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy the installed dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the rest of the application code
COPY --from=build /app .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]