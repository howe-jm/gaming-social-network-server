# Specifies where to get the base image and creates a new container for it
FROM node:latest

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

# Specify port app runs on
EXPOSE 5000

# Run the app
ENTRYPOINT ["node", "index.js"]
