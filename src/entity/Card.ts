import {Entity, Column, Generated, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Card {

  @Column()
  @Generated("uuid")
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  cardNumber!: string;

  @Column()
  expirationDate!: string;

  @Column()
  securityCode!: number;
}
