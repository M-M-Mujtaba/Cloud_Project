FROM node:10
WORKDIR /home/node/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
CMD npm start