FROM node:latest

WORKDIR /usr/app
ENV PORT=3000

COPY package.json .
RUN npm install

COPY index.js .

ENTRYPOINT ["node", "index.js"]