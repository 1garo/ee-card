import {MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { CardSeed } from "../seed/card.seed";
import { CompanySeed } from "../seed/company.seed";
import { EmployeeSeed } from "../seed/employee.seed";
import { Company } from "../entity/Company";
import { Employee } from "../entity/Employee";
import { Card } from "../entity/Card";
import { hash } from "bcryptjs";
/**
 * yarn build && yarn run typeorm schema:sync
 * yarn build && yarn run typeorm schema:drop
 * yarn build && yarn run typeorm migration:run
 * yarn build && yarn run typeorm migration:revert
 */
export class SeedDB1600449956251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        CardSeed.forEach(async (value: any) => {
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Card)
            .values(value)
            .execute();
        });

        let h = await hash('company', 8);
        CompanySeed.forEach(async value => {
            value.passwordHash = h;
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Company)
            .values(value)
            .execute();
        });

        const companies = await getRepository("company").find();
        const cards = await getRepository("card").find();
        h = await hash('employee', 8);
        console.log(EmployeeSeed.length)
        EmployeeSeed.forEach(async (value: Employee, i: number)=> {
            value.ecardId = cards[i]["id"]
            value.companyId = companies[i]["id"]
            value.passwordHash = h;
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Employee)
            .values(value)
            .execute();
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
