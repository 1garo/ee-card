import {Employee} from "../entity/Employee";
import {  Connection } from "typeorm";
import { Card } from "../entity/Card";
import { Request } from "express";

export async function findEmployeeByPassword(employee: Employee, CONN: Promise<Connection>): Promise<Employee | undefined> {
  console.log(employee);

  return await (await CONN).getRepository(Employee)
  .createQueryBuilder("employee")
  .where("employee.passwordHash = :hash", { hash: employee.passwordHash })
  .getOne();
}

export async function createE(employee: Employee, newCard: Card, companyName: string, CONN: Promise<Connection>) {
  const companyResp: any[] = await (await CONN).manager.query(`select id from company where name = '${companyName}';`); 
  if (companyResp.length === 0) {
    return {
      message: "`company name wasn't found!`",
      status: 404
    }
  }
  employee.companyId = companyResp[0].id;
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
  employee.ecardId = cardResp.raw[0].id; 
  let employeeResp = await (await CONN).createQueryBuilder()
            .insert()
            .into(Employee)
            .values(employee)
            .execute();
  if (employeeResp.raw.length === 0) {
    return {
      message: `Employee wasn't inserted`,
      status: 500 
    }
  }
  return {
    message: "User was succesfully inserted!",
    status: 200
  }
} 