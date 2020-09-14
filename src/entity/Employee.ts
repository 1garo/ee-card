import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
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
    password!: string;

    @Column()
    passwordHash!: string;
    
    public async checkPassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash);
    }

    public async encrypt (user: Employee) {
        if (user.password) {
            user.passwordHash = await hash(user.password, 8);
        }
    }
}

