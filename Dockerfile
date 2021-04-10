FROM node:14.16.1

WORKDIR /root/app/client

COPY package*.json ./
RUN npm ci

COPY . ./

CMD npm run build
