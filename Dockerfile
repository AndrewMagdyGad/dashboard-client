# start with node  base image
FROM node:10.16.3
RUN mkdir -p /app
COPY . /app

WORKDIR /app

# install dependencies
RUN npm install --silent
RUN npm run build
# expose it from Docker container
EXPOSE 8080

# Finally start the container command
CMD ["serve", "-s", "build"]
