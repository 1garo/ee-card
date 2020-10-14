import * as companyService from "../service/company.service";
import { Connection } from "typeorm";
import { Company } from "../entity/Company";
import { validate } from "class-validator";

export async function getCompanyByHash(passwordHash: string, CONN: Promise<Connection>) {
  const company = new Company();
  company.passwordHash = passwordHash;
  const errors = await validate(company);
  if (errors.length > 0){
    return Promise.reject("Cannot validate CARD, send all the required properties")
  }else {
    const companyResp = await companyService.findByCompanyNumber(company, CONN);
    if (!companyResp){
      return {
        data: "None company was found registered with the hash passed!",
        status: 404
      } 
    }
    delete companyResp['passwordHash'];
    return {
      data: companyResp,
      status: 200
    }
  }
}

export async function getAllCompanies(CONN: Promise<Connection>) {
  const companyResp = await companyService.findAllCompanies(CONN);
  if (companyResp === []){
    return {
      data: "None company was found registered!",
      status: 404
    } 
  }
  companyResp.forEach(data => delete data['passwordHash']);
  return {
    data: companyResp,
    status: 200
  }
}

export async function setCard(body: any, basicAuth: string, CONN: Promise<Connection>) {
  let company = new Company();
  company.email = body.email;
  company.name = body.name;
  const auth = Buffer.alloc(basicAuth.length, basicAuth, 'base64').toString();
  await company.encrypt(company, auth);
  const errors = await validate(company);
  if (errors.length > 0){
    return Promise.reject("Cannot validate CARD, send all the required properties")
  }else {
    const companyResp = await companyService.create(company, CONN); 
    if (companyResp.raw.length === 0) {
      return {
        data: `Company wasn't inserted`,
        status: 500 
      }
    }else {
      return {
        data: "Company was succesfully inserted on database!",
        status: 200
      }
    }
  }
}
