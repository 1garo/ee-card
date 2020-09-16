import express from 'express';
import { json } from 'body-parser';
import { PORT } from '../config.json';
import { employeeRouter } from './router/employeeRoute';
const app = express();
app.use(json());
app.use(employeeRouter);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});