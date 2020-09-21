import {Employee} from "../entity/Employee";
import {findEmployeeByPassword, createE} from "../dao/EmployeeDAO";
import { Connection } from "typeorm";
import { Request } from "express";

export async function findByPassword(employee: Employee, CONN: Promise<Connection>): Promise<Employee | undefined> {
  return await findEmployeeByPassword(employee, CONN);
}

export async function create(employee: Employee, CONN: Promise<Connection>) {
  // TODO: call DAO
  // return await createE(employee, CONN);
}