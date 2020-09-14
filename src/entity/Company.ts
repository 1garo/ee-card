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
    passwordHash!: string;
    
    public async checkPassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash);
    }

    public async encrypt (user: Company, password: string) {
      if (password) {
          user.passwordHash = await hash(password, 8);
      }
  }
}
