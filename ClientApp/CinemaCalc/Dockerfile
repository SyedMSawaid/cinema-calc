# Use Node 20 image to build the app
FROM node:20.13.1 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files and build the app
COPY . .
RUN npm run build

# Use Nginx as the final image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]