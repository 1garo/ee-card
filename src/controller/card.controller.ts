import * as cardService from "../service/card.service";
import { Connection } from "typeorm";
import { Card } from "../entity/Card";

export async function getCardByNumber(cardNumber: string, CONN: Promise<Connection>): Promise<Card | undefined> {
  const card = new Card();
  card.cardNumber = cardNumber;
  return await cardService.findByCardNumber(card, CONN);
}

export async function getAllCards(CONN: Promise<Connection>): Promise<Card[] | undefined> {
  return await cardService.findAllCards(CONN);
}
export async function setCard(body: any, CONN: Promise<Connection>) {
  let card = new Card();
  card = body;
  return await cardService.create(card, CONN); 
}
