# Use Node.js 18 Alpine for smaller image
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Enable yarn
RUN corepack enable yarn

# Set working directory
WORKDIR /app

# Copy package files from root (needed for workspace)
COPY ../../package.json ../../yarn.lock ../../.yarnrc ./
COPY ../../packages ./packages
COPY package.json ./backend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy backend source
COPY . ./backend

# Set working directory to backend
WORKDIR /app/backend

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE $PORT

# Set production environment
ENV NODE_ENV=production

# Start with migrations
CMD npx prisma migrate deploy && node dist/server.js
