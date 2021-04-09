import fastify from 'fastify';
import { cardRouter } from './router/v1/card';
import { companyRouter } from './router/v1/company';
import { employeeRouter } from './router/v1/employee';

//TODO: generate kompose again because a typo on db user name
const app = fastify(
  {logger: true}
);

app.register(require('fastify-url-data'))
app.register(cardRouter, {logLevel: 'debug', prefix: '/v1'})
app.register(companyRouter, {logLevel: 'debug', prefix: '/v1'})
app.register(employeeRouter, {logLevel: 'debug', prefix: '/v1'})
app.listen(3000);
