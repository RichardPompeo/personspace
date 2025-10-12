# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install yarn globally if not present
RUN corepack enable

# Copy root package.json and yarn.lock for workspace setup
COPY package.json yarn.lock ./
COPY .yarnrc ./

# Copy workspace package.json files
COPY apps/backend/package.json ./apps/backend/
COPY packages/*/package.json ./packages/*/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN yarn workspace backend prisma:generate

# Build the backend
RUN yarn workspace backend build

# Expose the port that the app runs on
EXPOSE $PORT

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "workspace", "backend", "deploy"]
