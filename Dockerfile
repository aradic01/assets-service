# This is a one-stage Dockerfile, sufficient for the purpose of this app.
# For production-grade applications, introducing builder stage should be considered for optimization.

# Get the latest LTS version
FROM node:lts

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]