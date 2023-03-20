# Use an official Node runtime as a parent image
FROM node:14-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:1.21.1-alpine

# Copy the build output from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file to the Nginx container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
