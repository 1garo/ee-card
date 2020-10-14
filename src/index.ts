import express from 'express';
import { json } from 'body-parser';
import { employeeRouter } from './router/employeeRoute';
import { cardRouter } from './router/cardRoute';
import { companyRouter } from './router/companyRoute';
const app = express();
app.use(json());
app.use(employeeRouter);
app.use(cardRouter);
app.use(companyRouter);
app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
});