import express from 'express';
import { cardRouter } from "./routes/card";
import { json } from 'body-parser';
import { PORT } from './config.json';
const app = express();
app.use(json());
app.use(cardRouter);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});