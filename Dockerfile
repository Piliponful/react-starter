FROM node:10.0.0

WORKDIR /root/app/client

COPY package*.json ./
RUN npm i

COPY . ./

CMD npm run build
