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

export async function createE(employee: Employee, CONN: Promise<Connection>) {
  return;
} 