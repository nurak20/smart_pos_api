# Multi-stage build for smaller production image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

# --- Production Stage ---
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install Prisma CLI (if needed)
RUN npm install -g prisma

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Database migration (optional - remove if not using Prisma)
RUN npx prisma generate

# Start the application
CMD ["node", "dist/main.js"]