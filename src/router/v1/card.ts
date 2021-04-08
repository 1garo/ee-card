import * as fast from 'fastify'
import {CONN} from "../../database/db";
import * as cardController from '../../controller/card.controller';

const card = async (fastify, _opts, done) => {

  fastify.get('/card/number/:cardNumber', async (req, reply: fast.FastifyReply) => {
    const cardNumber = req.params.cardNumber;
    if (cardNumber === '') {
      return reply.code(400).send({error: "cardNumber as parameter wasn't provided!"})
    }
    const resp = await cardController.getCardByNumber(cardNumber, CONN);
    if (resp === undefined){
      return reply.code(404).send({error: "Cardnumber wasn't found!"});
    }
    return reply.code(200).send(resp);
  });

  fastify.get('/card', async (_req, reply: fast.FastifyReply) => {
    const cards = await cardController.getAllCards(CONN);
    if (cards === undefined){
      return reply.code(404).send(cards);
    }
    return reply.code(200).send({cards});
  });

  fastify.post('/card', async (req, reply: fast.FastifyReply) => {
    const {message, status} =  await cardController.setCard(req.body, CONN);
    if (status === 500){
      return reply.code(status).send({error: `${message}`})
    }
    return reply.code(status).send({message: `${message}`})
  });

  done();
};

export {card as cardRouter};
