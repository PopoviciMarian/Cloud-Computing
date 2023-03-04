FROM node:19


WORKDIR /app


COPY package.json .
RUN npm install -g npm@9.6.0
RUN npm install -g nodemon --save
RUN npm install --force
COPY . .

CMD ["/usr/local/bin/nodemon", "src/index.ts"]