import { Employee } from "../entity/Employee";
import { findByPassword } from "../service/employeeService";
import { Connection } from "typeorm";

export async function getUserbyHash(password: string, CONN: Promise<Connection>): Promise<Employee | undefined> {
  const user = new Employee();
  // user.id = "02d36095-90ff-4d83-9843-73b9484162c6";
  // await user.encrypt(user, password);
  user.passwordHash = password;
  return await findByPassword(user, CONN);
}

