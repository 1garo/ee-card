import { Employee } from "../entity/Employee";
import * as employeeService from "../service/employee.service";
import { Connection } from "typeorm";
import { Card } from "../entity/Card";

export async function getEmployeeByHash(password: string, CONN: Promise<Connection>): Promise<Employee | undefined> {
  const user = new Employee();
  user.passwordHash = password;
  return await employeeService.findByPassword(user, CONN);
}

export async function setEmployee(body: any, basicAuth: string, CONN: Promise<Connection>) {
  let newCard = new Card();
  let user = new Employee();
  newCard = body.card;
  delete body['card'];
  const companyName = body.companyName;
  delete body['companyName']
  user.age = body.age;
  user.email = body.email;
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  const auth = Buffer.alloc(basicAuth.length, basicAuth, 'base64').toString();
  await user.encrypt(user, auth)
  return await employeeService.create(user, newCard, companyName, CONN); 
}
