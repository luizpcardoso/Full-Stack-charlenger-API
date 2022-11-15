import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Transaction } from "./transactions.entity";
import { User } from "./user.entity";

@Entity()
export class Account {
  @PrimaryColumn("uuid")
  readonly account_id: string;

  @Column({
    type: "float",
    nullable: true,
  })
  balance: number;

  @OneToOne((type) => User, (account) => Account)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  transactionsDebit?: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  transactionsCredit?: Transaction[];

  constructor() {
    if (!this.account_id) {
      this.account_id = uuid();
    }
  }
}
