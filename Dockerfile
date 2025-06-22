# -------- STAGE 1: Base build environment --------
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# -------- STAGE 2: Production Build --------
FROM base AS build

# Set NODE_ENV to production
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# -------- STAGE 3: Production Runner --------
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Set environment variable for production
ENV NODE_ENV=production

# Expose default Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# -------- STAGE 4: Development (optional) --------
# Use this stage if you want a dev container
FROM base AS dev

ENV NODE_ENV=development

# Install extra dev dependencies if needed
# RUN npm install --only=development

# Expose Next.js dev port
EXPOSE 3000

# Start dev server (note: use docker-compose for live reload)
CMD ["npm", "run", "dev"]
