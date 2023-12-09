# Use Node.js 16 with the Alpine Linux distribution as the base image
FROM node:16-alpine


# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install 

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]