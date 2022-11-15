import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Account } from "./accounts.entity";

@Entity()
export class Transaction {
  @PrimaryColumn("uuid")
  readonly transaction_id: string;

  @ManyToOne(() => Account, (account) => account.transactionsDebit)
  @JoinColumn({ name: "transactionsDebit" })
  debitedAccount: Account;

  @ManyToOne(() => Account, (account) => account.transactionsCredit)
  @JoinColumn({ name: "transactionsCredit" })
  creditedAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.transaction_id) {
      this.transaction_id = uuid();
    }
  }
}
