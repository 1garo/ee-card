import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { compare, hash } from "bcryptjs";
import { Employee } from "./Employee";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

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
