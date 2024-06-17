# Front-End/expense-tracker/Dockerfile

FROM node:18.20.3

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from local machine to the container
COPY ./package*.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of the application code from local machine to the container
COPY ./ ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
