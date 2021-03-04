# start with node  base image
FROM node:10.16.3

# Create an app directory (in the Docker container)
RUN mkdir -p /app
COPY . /app

WORKDIR /app

# install dependencies
RUN npm install --silent
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]   
