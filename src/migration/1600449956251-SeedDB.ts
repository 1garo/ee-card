import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { CardSeed } from "../seed/card.seed";
import { CompanySeed } from "../seed/company.seed";
import { Company } from "../entity/Company";
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
        const h = await hash('admin', 8);
        CompanySeed.forEach(async value => {
            value.passwordHash = h; 
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Company)
            .values(value)
            .execute();
        }); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
