import express, {Request, Response} from 'express';

/**
 * //TODO: create card endpoints and call service
 */
const router = express.Router();

router.get('/card', [], (req: Request, res: Response) => {
  return res.send('the card')
});

router.post('/card', [], (req: Request, res: Response) => {
  return res.send('new card created')
});

export {router as cardRouter};