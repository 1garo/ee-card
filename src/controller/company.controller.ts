import * as companyService from "../service/company.service";
import { Connection } from "typeorm";
import { Company } from "../entity/Company";

export async function getCompanyByHash(passwordHash: string, CONN: Promise<Connection>) {
  const card = new Company();
  card.passwordHash = passwordHash;
  const companyResp = await companyService.findByCompanyNumber(card, CONN);
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
  console.log(company);
  const companyResp = await companyService.create(company, CONN); 
  console.log(companyResp);
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
