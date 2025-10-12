FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy prisma schema first
COPY prisma ./prisma/

# Generate Prisma client
RUN yarn prisma:generate

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port (Railway will provide PORT via environment variable)
EXPOSE 4000

# Start the application
CMD ["yarn", "start"]
