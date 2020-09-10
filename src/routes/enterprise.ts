import express, {Request, Response} from 'express';
/**
 * //TODO: create enterprise endpoints and call service
 */
const router = express.Router();

router.get('/enterprise', [], (req: Request, res: Response) => {
  return res.send('the todo')
});

router.post('/enterprise', [], (req: Request, res: Response) => {
  return res.send('new todo created')
});

export {router as todoRouter};