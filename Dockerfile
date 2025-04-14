# Dockerfile for package.json
# Stage 1: Build dependencies and application
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy application source code
COPY . .

# Stage 2: Create optimized production image
FROM node:16-alpine

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files from builder
COPY --from=builder /app ./

# Expose default Express port
EXPOSE 3000

# Start the application using the main server file
CMD ["node", "server.js"]