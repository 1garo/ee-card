import {MigrationInterface, QueryRunner} from "typeorm";
import { Company } from "../entity/Company";
import { CompanySeed } from "../seed/company.seed";
import { hash } from "bcryptjs";

/**
 * yarn build && yarn run typeorm schema:sync
 * yarn build && yarn run typeorm schema:drop
 * yarn build && yarn run typeorm migration:run
 * yarn build && yarn run typeorm migration:revert
 */

export class CreateCompany1618358321617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pwHash = await hash('company', 8);
        CompanySeed.forEach(async value => {
            value.passwordHash = pwHash;
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Company)
            .values(value)
            .execute();
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("company");
    }

}
