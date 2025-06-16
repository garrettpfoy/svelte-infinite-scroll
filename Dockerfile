# ==========================
# 1) Build Stage
# ==========================
FROM node:24-alpine AS builder

# Set Node environment to production
ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy manifest files and install all dependencies (dev + prod)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build the SvelteKit app
RUN pnpm run build


# ==========================
# 2) Runtime Stage
# ==========================
FROM node:24-alpine AS runner

# Set Node environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy only what’s needed to run the app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Start the Node server
CMD ["node", "build/index.js"]