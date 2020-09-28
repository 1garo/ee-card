import express, {Request, Response} from 'express';
import {CONN} from "../database/db";
import * as cardController from '../controller/card.controller';

const router = express.Router();

router.get('/card/number/:cardNumber', async (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber;
  if (cardNumber === '') {
    return res.status(400).send({error: "cardNumber as parameter wasn't provided!"})
  } 
  const resp = await cardController.getCardByNumber(cardNumber, CONN);
  if (resp === undefined){
    return res.status(404).send({error: "Cardnumber wasn't found!"});
  }
  return res.status(200).send(resp);
});

router.get('/card', async (_, res: Response) => {
  const cards = await cardController.getAllCards(CONN);
  if (cards === undefined){
    return res.status(404).send(cards);
  }
  return res.status(200).send({cards});
});

router.post('/card', async (req: Request, res: Response) => {
  const {message, status} =  await cardController.setCard(req.body, CONN);
  if (status === 500){
    return res.status(status).send({error: `${message}`})
  }
  return res.status(status).send({message: `${message}`})
});

export {router as cardRouter};