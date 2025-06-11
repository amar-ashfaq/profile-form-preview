# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json / yarn.lock first
COPY package*.json ./
# Or if you're using Yarn, copy yarn.lock as well
# COPY package.json yarn.lock ./

RUN npm install
# Or: RUN yarn install

COPY . .

# Build the app for production
RUN npm run build
# Or: RUN yarn build

# Step 2: Serve the app using a lightweight web server (nginx)
FROM nginx:alpine

# Copy built app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
