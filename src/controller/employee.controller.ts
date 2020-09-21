import { Employee } from "../entity/Employee";
import { findByPassword, create } from "../service/employee.service";
import { Connection } from "typeorm";
import { Request } from "express";
import { Card } from "../entity/Card";

export async function getUserbyHash(password: string, CONN: Promise<Connection>): Promise<Employee | undefined> {
  const user = new Employee();
  user.passwordHash = password;
  return await findByPassword(user, CONN);
}

export async function setEmployee(body: any, CONN: Promise<Connection>) {

  const user1 = new Employee();
  let newCard = new Card();
  newCard = body.card;
  delete body['card'];
  user1.age = body.age;
  user1.lastName = body.lastName;
  user1.firstName = body.firstName;
  user1.email = body.email;
  console.log('query using company name: ' + body.companyName);
  const companyResp: any[] = await (await CONN).manager.query(`select id from company where name = '${body.companyName}';`); 
  if (companyResp.length === 0) {
    return {
      message: "`company name wasn't found!`",
      status: 404
    }
  }
  user1.companyId = companyResp[0].id;
  let cardResp = await (await CONN).createQueryBuilder()
            .insert()
            .into(Card)
            .values(newCard)
            .execute();
  if (cardResp.raw.length === 0) {
    return {
      message: `Card wasn't able to be inserted`,
      status: 500 
    }
  }
  user1.ecardId = cardResp.raw[0].id; 
  await user1.encrypt(user1, 'teste');
  let employeeResp = await (await CONN).createQueryBuilder()
            .insert()
            .into(Employee)
            .values(user1)
            .execute();
  console.log(user1);
            
  if (employeeResp.raw.length === 0) {
    return {
      message: `Employee wasn't able to be inserted`,
      status: 500 
    }
  }
  return {
    message: "",
    status: 200
  }
  // TODO: call service
  // return await create(user1, CONN); 
}
