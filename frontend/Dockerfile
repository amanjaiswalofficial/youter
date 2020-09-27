
# Stage 1: Building the project
# download required node image and name it as "build-deps"
FROM node:10.19 as build-deps

# go to /usr/src/app and now we are stuck there
WORKDIR /usr/src/app

# copy everything there
COPY package.json ./
COPY . ./

# install dependencies
RUN npm install

# once done, make the build
RUN npm run build


# Stage 2: The Production Environment
# Since, this stage has no idea about image created before
# using required nginx image
FROM nginx:1.12-alpine

# here "build-deps" is used to look up and find previously created image, and copy from it's /app/build folder everything
# to Destination: nginx/html, the default location nginx to serve static info
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# expose required port
EXPOSE 80

# due to no entrypoint, simply the command in CMD is run and the page can be seen
# on hitting the mapped port
CMD ["nginx", "-g", "daemon off;"]