# Start with a base image that has Node.js 14 installed
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json from local machine to the container
COPY ./expense-tracker/package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the application code from local machine to the container
COPY ./expense-tracker/ ./

# Build the application
RUN npm run build

# Optionally, if you want to serve the application using a static server, you can add:
# Install serve globally
RUN npm install -g serve

# Command to serve the build files
CMD ["serve", "-s", "build"]
