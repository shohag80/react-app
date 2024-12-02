# Use the official Node.js image for building the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR ./src/app

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run the application
CMD ["npm", "start"]