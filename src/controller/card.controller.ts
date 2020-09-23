import { Employee } from "../entity/Employee";
import * as cardService from "../service/card.service";
import { Connection } from "typeorm";
import { Card } from "../entity/Card";
import {CONN} from "../database/db";

export async function getCardByNumber(cardNumber: string, CONN: Promise<Connection>): Promise<Card | undefined> {
  const card = new Card();
  card.cardNumber = cardNumber;
  return await cardService.findByCardNumber(card, CONN);
}

export async function getAllCards(body: any, CONN: Promise<Connection>): Promise<Card[] | undefined> {
  let card = new Card();
  card = body;
  return await cardService.findAllCards(card, CONN);
}
export async function setCard(body: any, CONN: Promise<Connection>) {
  let card = new Card();
  card = body;
  return await cardService.create(card, CONN); 
}
