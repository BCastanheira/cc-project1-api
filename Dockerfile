FROM node:latest

WORKDIR /usr/app

# Set argument to receive url in buildtime or to use default value
ARG ATLAS_DB=localhost

# Pass argument as environment variable for container
ENV DATABASE_URI=${ATLAS_DB}

COPY package.json .
RUN npm install

COPY index.js .

ENTRYPOINT ["node", "index.js"]