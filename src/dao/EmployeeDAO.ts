import {Employee} from "../entity/Employee";
import {  Connection } from "typeorm";

export default async function findEmployeeByPassword(employee: Employee, CONN: Promise<Connection>): Promise<Employee | undefined> {
  console.log(employee);

  return await (await CONN).getRepository(Employee)
  .createQueryBuilder("employee")
  .where("employee.passwordHash = :hash", { hash: employee.passwordHash })
  .getOne();
}