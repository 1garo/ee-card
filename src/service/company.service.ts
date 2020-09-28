import  * as companyDAO from "../dao/companyDAO";
import { Connection, InsertResult } from "typeorm";
import { Company } from "../entity/Company";

export async function findByCompanyNumber(card: Company, CONN: Promise<Connection>): Promise<Company> {
  return await companyDAO.findCompanyByCompanyNumber(card, CONN);
}

export async function findAllCompanies(CONN: Promise<Connection>): Promise<Company[]> {
  return await companyDAO.findAll(CONN);
}

export async function create(newCompany: Company, CONN: Promise<Connection>): Promise<InsertResult> {
  return await companyDAO.createCompany(newCompany, CONN);
}