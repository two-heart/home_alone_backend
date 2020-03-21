FROM node:12
WORKDIR /var/app/backend
COPY package*  ./
RUN npm install
COPY * ./
RUN npm run build
CMD node ./dist/main.js