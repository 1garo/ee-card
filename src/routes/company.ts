import express, {Request, Response} from 'express';
/**
 * //TODO: create company endpoints and call service
 */
const router = express.Router();

router.get('/company', [], (req: Request, res: Response) => {
  return res.send('the todo')
});

router.post('/company', [], (req: Request, res: Response) => {
  return res.send('new todo created')
});

export {router as todoRouter};