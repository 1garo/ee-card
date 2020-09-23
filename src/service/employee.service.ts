import {Employee} from "../entity/Employee";
import  * as employeeDAO from "../dao/EmployeeDAO";
import { Connection } from "typeorm";
import { Request } from "express";
import { Card } from "../entity/Card";

export async function findByPassword(employee: Employee, CONN: Promise<Connection>): Promise<Employee | undefined> {
  return await employeeDAO.findEmployeeByPassword(employee, CONN);
}

export async function create(employee: Employee, newCard: Card, companyName: string, CONN: Promise<Connection>) {
  return await employeeDAO.createE(employee, newCard, companyName, CONN);
}