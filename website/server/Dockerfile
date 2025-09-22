# ==============================================================================
# Base image
# ==============================================================================
FROM node:23-alpine AS builder

# Install git and other dependencies
RUN apk add --no-cache \
    git \
    ca-certificates

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# ==============================================================================
# Production image
# ==============================================================================
FROM node:23-alpine

# Install git and other dependencies
RUN apk add --no-cache \
    git \
    ca-certificates \
    curl

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production \
    PORT=8080

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start the server
CMD ["npm", "start"]
