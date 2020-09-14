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

        await queryRunner.addColumn("employee", new TableColumn({
            name: "companyId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("employee", new TableForeignKey({
            columnNames: ["companyId"],
            referencedColumnNames: ["id"],
            referencedTableName: "company",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("employee");
        if (table != undefined) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("companyId") !== -1);
            if (foreignKey != undefined) {
            await queryRunner.dropForeignKey("employee", foreignKey);
            await queryRunner.dropColumn("employee", "companyId");
            await queryRunner.dropTable("employee");
            await queryRunner.dropTable("company");
            }
        }
    }
}
