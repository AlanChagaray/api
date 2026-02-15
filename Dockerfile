FROM node:18-alpine AS builder
WORKDIR /app

# Copy package manifests and install dev deps to build TypeScript
COPY package*.json ./
RUN npm ci

# Copy rest and build (try npm run build, fallback to tsc)
COPY . .
RUN sh -c "npm run build || npx tsc -p ."

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Default start file — adjust to your build output (e.g., dist/index.js)
CMD ["node", "dist/app.js"]
