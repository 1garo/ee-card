import {Entity, PrimaryGeneratedColumn, Column, Generated, ManyToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { compare, hash } from "bcryptjs";
import { Company } from "./Company";
import { Card } from "./Card";

@Entity()
export class Employee {

    @Column()
    @Generated("uuid")
    @PrimaryGeneratedColumn()
    id!: string;

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

    @Column()
    @Generated("uuid")
    ecardId!: string

    @ManyToOne(_type => Company, company => company.employees)
    company!: Company;

    @OneToOne(_type => Card)
    @JoinColumn()
    ecard!: Card;

    public async checkPassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash);
    }

    public async encrypt (user: Employee, password: string) {
        if (password) {
            user.passwordHash = await hash(password, 8);
        }
    }
}

