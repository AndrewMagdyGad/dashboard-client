# set the base image
FROM node:alpine as build
WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build

# set up production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
