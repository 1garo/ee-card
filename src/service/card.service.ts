import {Employee} from "../entity/Employee";
import  * as cardDAO from "../dao/cardDAO";
import { Connection } from "typeorm";
import { Request } from "express";
import { Card } from "../entity/Card";

export async function findByCardNumber(card: Card, CONN: Promise<Connection>): Promise<Card | undefined> {
  return await cardDAO.findCardByCardNumber(card, CONN);
}

export async function findAllCards(CONN: Promise<Connection>): Promise<Card[] | undefined> {
  return await cardDAO.findAll(CONN);
}

export async function create(newCard: Card, CONN: Promise<Connection>) {
  return await cardDAO.createCard(newCard, CONN);
}