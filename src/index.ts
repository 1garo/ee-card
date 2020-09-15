import express from 'express';
import { json } from 'body-parser';
import { PORT } from '../config.json';
const app = express();
app.use(json());
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});