import * as cardService from "../service/card.service";
import { Connection } from "typeorm";
import { Card } from "../entity/Card";
import { validate } from "class-validator";

// TODO: test new validations on all entities
// TODO: REFACTOR ALL THIS SHIT
export async function getCardByNumber(cardNumber: string, CONN: Promise<Connection>): Promise<Card | undefined> {
  const card = new Card();
  card.cardNumber = cardNumber;
  const errors = await validate(card);
  if (errors.length > 0){
    return Promise.reject("Cannot validate CARD, send all the required properties")
  }else {
    return await cardService.findByCardNumber(card, CONN);
  }
}

export async function getAllCards(CONN: Promise<Connection>): Promise<Card[] | undefined> {
  return await cardService.findAllCards(CONN);
}

export async function setCard(body: Card, CONN: Promise<Connection>) {
  const card = new Card();
  card.cardNumber = body.cardNumber
  card.expirationDate = body.expirationDate
  card.securityCode = body.securityCode
  console.log(card);
  const errors = await validate(card);
  if (errors.length > 0){
    return {
      message: "Cannot validate CARD, send all the required properties",
      status: 500
    }
  }else {
    return await cardService.create(card, CONN); 
  }
}
