import {  Connection, InsertResult } from "typeorm";
import { Company } from "../entity/Company";

export async function findCompanyByCompanyNumber(company: Company, CONN: Promise<Connection>): Promise<Company> {
  return await (await CONN).getRepository(Company)
  .createQueryBuilder("company")
  .where("company.passwordHash = :hash", { hash: company.passwordHash})
  .getOne();
}

export async function findAll(CONN: Promise<Connection>): Promise<Company[]> {
  return await (await CONN).getRepository(Company)
  .createQueryBuilder("company").getMany();
}

export async function createCompany(newCompany: Company, CONN: Promise<Connection>): Promise<InsertResult> {
  return await (await CONN).createQueryBuilder()
            .insert()
            .into(Company)
            .values(newCompany)
            .execute();
} 