import {Employee} from "../entity/Employee";
import findEmployeeByPassword from "../dao/EmployeeDAO";
import { Connection } from "typeorm";

export async function findByPassword(employee: Employee, CONN: Promise<Connection>): Promise<Employee | undefined> {
  return await findEmployeeByPassword(employee, CONN);
}