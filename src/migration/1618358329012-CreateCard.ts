import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { CardSeed } from "../seed/card.seed";
import { Card } from "../entity/Card";

export class CreateCard1618358329012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        CardSeed.forEach(async (value: any) => {
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Card)
            .values(value)
            .execute();
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("card");
    }

}
