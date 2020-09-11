import express, {Request, Response} from 'express';

/**
 * //TODO: create employee endpoints and call service
 */

const router = express.Router();

router.get('/employee', [], (req: Request, res: Response) => {
  return res.send('the todo')
});

router.post('/employee', [], (req: Request, res: Response) => {
  // TODO: call service with a filled employee model | service call dao. 
  return res.send('new todo created')
});

export {router as todoRouter};