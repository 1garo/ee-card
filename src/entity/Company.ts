import {Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany} from "typeorm";
import { compare, hash } from "bcryptjs";
import { Employee } from "./Employee";

@Entity()
export class Company {

    @Column()
    @Generated("uuid")
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
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
