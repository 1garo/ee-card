import  createConnection  from "../database/index";
import {Employee} from "../entity/Employee";
import findEmployeeByID from "../dao/EmployeeDAO";

export async function findByID(employee: Employee): Promise<Employee | undefined> {
  return findEmployeeByID(employee);
}