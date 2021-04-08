import express from 'express';
import { json } from 'body-parser';
import fastify from 'fastify';
import { employeeRouter } from './router/employeeRoute';
//import { cardRouter } from './router/cardRoute';
import { companyRouter } from './router/companyRoute';
import { cardRouter } from './router/v1/card';
//import {} from './router/v1/users';
//const app = express();
//TODO: generate kompose again because a typo on db user name
const app = fastify(
  {logger: true}
);

app.register(require('fastify-url-data'))
app.register(cardRouter, {logLevel: 'debug', prefix: '/v1'})
app.listen(3000);
