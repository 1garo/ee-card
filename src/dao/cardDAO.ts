import {Employee} from "../entity/Employee";
import {  Connection } from "typeorm";
import { Card } from "../entity/Card";
import { Request } from "express";

export async function findCardByCardNumber(card: Card, CONN: Promise<Connection>): Promise<Card | undefined> {
  return await (await CONN).getRepository(Card)
  .createQueryBuilder("card")
  .where("card.cardNumber = :number", { number: card.cardNumber})
  .getOne();
}

export async function findAll(card: Card, CONN: Promise<Connection>): Promise<Card[] | undefined> {
  return await (await CONN).getRepository(Card)
  .createQueryBuilder("card").getMany();
}

export async function createCard(newCard: Card, CONN: Promise<Connection>) {
  let cardResp = await (await CONN).createQueryBuilder()
            .insert()
            .into(Card)
            .values(newCard)
            .execute();
  if (cardResp.raw.length === 0) {
    return {
      message: `Card wasn't inserted`,
      status: 500 
    }
  }
  return {
    message: "Card was succesfully inserted on database!",
    status: 200
  }
} 