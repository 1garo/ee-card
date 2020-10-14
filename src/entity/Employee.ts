import {Entity, PrimaryGeneratedColumn, Column, Generated, ManyToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { compare, hash } from "bcryptjs";
import { Company } from "./Company";
import { Card } from "./Card";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Employee {

    @Column()
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    id!: string;

    @Column()
    @IsNotEmpty()
    firstName!: string;

    @Column()
    @IsNotEmpty()
    lastName!: string;

    @Column()
    @IsNotEmpty()
    age!: number;

    @Column()
    @IsNotEmpty()
    email!: string;

    @Column()
    @IsNotEmpty()
    passwordHash!: string;
    
    @Column()
    @IsNotEmpty()
    @Generated("uuid")
    companyId!: string;

    @Column()
    @IsNotEmpty()
    @Generated("uuid")
    ecardId!: string

    @ManyToOne(_type => Company, company => company.employees)
    @IsNotEmpty()
    company!: Company;

    @OneToOne(_type => Card)
    @IsNotEmpty()
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

