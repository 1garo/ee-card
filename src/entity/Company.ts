import {Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany} from "typeorm";
import { compare, hash } from "bcryptjs";
import { Employee } from "./Employee";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Company {

    @Column()
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    id!: string;

    @Column()
    @IsNotEmpty()
    name!: string

    @Column()
    @IsNotEmpty()
    email!: string;

    @Column()
    @IsNotEmpty()
    passwordHash!: string;

    @OneToMany(_type => Employee, employee => employee.company)
    employees!: Employee[];
    
    public async checkPassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash);
    }

    public async encrypt (user: Company, password: string) {
      if (password) {
          user.passwordHash = await hash(password, 8);
      }
  }
}
