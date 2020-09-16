import {Entity, Column, Generated, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";

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
  securityCode!: number;
}
