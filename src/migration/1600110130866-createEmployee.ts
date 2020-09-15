import {MigrationInterface, QueryRunner, Table, DatabaseType, TableColumn, TableForeignKey} from "typeorm";
export default class createEmployee1600110130866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isPrimary: true,
                },
                {
                    name: 'firstName',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'lastName',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'age',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'passwordHash',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
            ]
        }), true);
        await queryRunner.createTable(new Table({
            name: 'company',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isPrimary: true,
                },
                {
                    name: 'firstName',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'lastName',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'passwordHash',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'card',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                    isPrimary: true,
                },
                {
                    name: 'cardNumber',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'expirationDate',
                    type: 'varchar', 
                    isNullable: false
                },
                {
                    name: 'securityCode',
                    type: 'int', 
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp', 
                    default: 'now()',
                    isNullable: false
                },
            ]
        }), true);

        await queryRunner.addColumn("employee", new TableColumn({
            name: "companyId",
            type: "uuid"
        }));

        await queryRunner.addColumn("employee", new TableColumn({
            name: "ecardId",
            type: "uuid"
        }));

        await queryRunner.createForeignKeys("employee", [new TableForeignKey({
            columnNames: ["companyId"],
            referencedColumnNames: ["id"],
            referencedTableName: "company",
            onDelete: "CASCADE"
        }), new TableForeignKey({
            columnNames: ["ecardId"],
            referencedColumnNames: ["id"],
            referencedTableName: "card",
            onDelete: "CASCADE"
        })]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("employee");
        if (table != undefined) {
            const fkCompany = table.foreignKeys.find(fk => fk.columnNames.indexOf("companyId") !== -1);
            const fkCard = table.foreignKeys.find(fk => fk.columnNames.indexOf("ecardId") !== -1);
            if (fkCard != undefined && fkCompany != undefined) {
            await queryRunner.dropForeignKey("employee", fkCompany);
            await queryRunner.dropColumn("employee", "companyId");
            await queryRunner.dropForeignKey("employee", fkCard);
            await queryRunner.dropColumn("employee", "ecardId");
            await queryRunner.dropTable("employee");
            await queryRunner.dropTable("company");
            await queryRunner.dropTable("card");
            }
        }
    }
}
