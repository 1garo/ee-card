import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { EmployeeSeed } from "../seed/employee.seed";
import { Employee } from "../entity/Employee";
import { hash } from "bcryptjs";

export class CreateEmployee1618358332883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const companies = await getRepository("company").find();
        const cards = await getRepository("card").find();

        const pwHash = await hash('employee', 8);
        console.log(`company: ${companies}\ncards: ${cards}`);
        EmployeeSeed.forEach(async (value: Employee, i: number)=> {
            value.ecardId = cards[i]["id"]
            value.companyId = companies[i]["id"]
            value.passwordHash = pwHash;
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Employee)
            .values(value)
            .execute();
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("employee");
    }

}
