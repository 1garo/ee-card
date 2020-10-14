import { Entity, Column, Generated, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty} from "class-validator";
@Entity()
export class Card {
  @Column()
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  id!: string;

  @Column()
  cardNumber!: string;

  @Column()
  expirationDate!: string;

  @Column()
  @IsNotEmpty()
  securityCode!: number;
}
