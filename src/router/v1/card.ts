import * as fast from 'fastify'
import {CONN} from "../../database/db";
import * as cardController from '../../controller/card.controller';

const card = async (fastify, _opts, done) => {

  fastify.get('/card/number/:cardNumber', async function (req, reply: fast.FastifyReply) {
      const cardNumber = req.params.cardNumber;
      if (cardNumber === '') {
        reply.code(400).send({ error: "cardNumber as parameter wasn't provided!" });
      }
      const resp = await cardController.getCardByNumber(cardNumber, CONN);
      if (resp === undefined) {
        reply.code(404).send({ error: "Cardnumber wasn't found!" });
      }

      reply.code(200).send(resp);
    });

  fastify.get('/card', async function (reply: fast.FastifyReply) {
    const cards = await cardController.getAllCards(CONN);
    if (cards === undefined){
       reply.code(404).send(cards);
    }

    reply.code(200).send(cards)
  });

  fastify.post('/card', async function (req, reply: fast.FastifyReply) {
      const { message, status } = await cardController.setCard(req.body, CONN);
      if (status === 500) {
        reply.code(status).send({ error: `${message}` });
      }

      reply.code(status).send({ message: `${message}` });
    });

  done();
};

export {card as cardRouter};
