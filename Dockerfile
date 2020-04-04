FROM node:10.0.0

WORKDIR /root/app/client

RUN apt-get update -y && apt-get install 'libpng*' -y

COPY package*.json ./
RUN npm i

COPY . ./

CMD npm run build
