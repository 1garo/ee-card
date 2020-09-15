import  createConnection  from "../database/index";
import {Employee} from "../entity/Employee";

export default async function findEmployeeByID(employee: Employee): Promise<Employee | undefined> {
  const a = await createConnection;
  return await a.getRepository(Employee)
  .createQueryBuilder("employee")
  .where("employee.id = :id", { id: '02d36095-90ff-4d83-9843-73b9484162c6' })
  .getOne();
}