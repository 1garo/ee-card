import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { CardSeed } from "../seed/card.seed";
import { CompanySeed } from "../seed/company.seed";
import { EmployeeSeed } from "../seed/employee.seed";
import { Company } from "../entity/Company";
import { Card } from "../entity/Card";
import { Employee } from "../entity/Employee";
import { hash } from "bcryptjs";

/**
 * yarn build && yarn run typeorm schema:sync
 * yarn build && yarn run typeorm migration:run 
 * yarn build && yarn run typeorm migration:revert
 */
export class SeedDB1600449956251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //   const userRoleSeed: any = ;
        //   userRoleSeed.permissions = permissions;
    //    const cEmployee = new createEmployee();
    //    await cEmployee.up(queryRunner);
    //    await queryRunner.connection.synchronize(true);
        CardSeed.forEach(async (value: any) => {
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Card)
            .values(value)
            .execute();
        });
        const h = await hash('teste', 8);
        CompanySeed.forEach(async value => {
            // console.log('i: ' + i);
            value.passwordHash = h; 
            await queryRunner.connection.createQueryBuilder()
            .insert()
            .into(Company)
            .values(value)
            .execute();
        }); 

        let companyDB: string[] = [];
        let cardDb: string[] = [];
        
        const size = EmployeeSeed.length;
        const element = ["company", "card"];
        for (let index = 0; index < size; index++) {
            element.forEach(async value => {
                try {
                    if (value === "company"){
                        CompanySeed.forEach(async element => {
                            try{ 
                                element.passwordHash = h; 
                                const data = await queryRunner.connection.getRepository(Company)
                                .createQueryBuilder("company")
                                .where("company.passwordHash = :hash", { hash: element.passwordHash })
                                .getOne();
                                console.log('data company: '+ JSON.stringify(data));
                                companyDB.push(JSON.stringify(data));
                                console.log('A: '+ companyDB);
                                
                             } catch (err) {
                                 console.log('ERROR COMPANY: '+ err);
                             }
                         });
                    }else{
                        CardSeed.forEach(async element => {
                            try {
                                console.log('card number:' +element.cardNumber);
                                
                                const data = await queryRunner.connection.getRepository(Card)
                                .createQueryBuilder("card")
                                .where("card.cardNumber = :number", { number: element.cardNumber})
                                .getOne();
                                console.log('data card: '+ JSON.stringify(data));
                                cardDb.push(JSON.stringify(data));
                                console.log('B: '+ cardDb);
                            }catch(err) {
                                console.log('ERROR CARD: ' + err);
                            }
                        });
                    }
                } catch (error) {
                    console.log('ERROR: '+ error);
                }
            })
        }
     

      
        cardDb.forEach(a => console.log('cardDb: ' + a)); 
        companyDB.forEach(a => console.log('companyDB: ' + a)); 

        // let i = 0;
        // EmployeeSeed.forEach(async value => {
        //     value.companyId = companyDB[size-i]!.id; 
        //     value.ecardId = cardDb[size-i]!.id;
        //     value.passwordHash =h; 
        //     try{
        //         await queryRunner.connection.createQueryBuilder()
        //         .insert()
        //         .into(Employee)
        //         .values(value)
        //         .execute();
        //         i += 1;
        //     } catch(err) {
        //         console.log('ERROR EMPLOYEE: ' + err);
        //     }
        // });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
