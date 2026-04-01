# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Start the server
CMD [ "npm", "start" ]