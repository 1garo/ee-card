import Sequelize, { Model } from 'sequelize';
import {Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import database from '../database/db';

export interface UserI {
  id: number 
  firstName: string
  lastname: string
  country: string
  password: string
  passwordHash: string
  username: string
  email: string
  createdAt: Date;
  updatedAt: Date;
  checkPassoword(password: string): Promise<boolean>;
}

@Table({tableName: "employee", timestamps: true})
export default class Employee extends Model implements UserI{
  public async checkPassoword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.NUMBER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  lastname!: string;
  
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  country!: string;
  
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  password!: string;
  
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  passwordHash!: string;
  
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  username!: string;
  
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING)
  email!: string;
  
  @AllowNull(false)
  @NotEmpty
  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;
  
  @AllowNull(false)
  @NotEmpty
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}

Employee.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    passwordHash: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
  }
);

Employee.addHook(
  'beforeSave',
  async (user: Employee) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 8);
    }
  }
);
