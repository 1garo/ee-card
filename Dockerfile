FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build 

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install --production

COPY --from=builder /usr/app/dist ./dist

COPY ormconfig.docker.json ./ormconfig.json
COPY database.dev.env ./database.env 
COPY config.json .
COPY tsconfig.json .

EXPOSE 8000 
CMD ["yarn", "start_t"]