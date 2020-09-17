FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN npm run build 

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install --production

COPY --from=builder /usr/app/dist ./dist

COPY ormconfig.docker.json ./ormconfig.json
COPY database.env .
COPY config.json .


EXPOSE 8000 
CMD node dist/src/index.js