import {Entity, PrimaryGeneratedColumn, Column, Generated} from "typeorm";
import { compare, hash } from "bcryptjs";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @Column()
    email!: string;

    @Column()
    passwordHash!: string;
    
    @Column()
    @Generated("uuid")
    companyId!: string;

    // Refactor hash 
    public async checkPassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash);
    }

    public async encrypt (user: Employee, password: string) {
        if (password) {
            user.passwordHash = await hash(password, 8);
        }
    }
}

