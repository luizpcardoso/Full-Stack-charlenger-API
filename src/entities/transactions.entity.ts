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
import { User } from "./user.entity";

@Entity()
export class Transaction {
  @PrimaryColumn("uuid")
  readonly transaction_id: string;

  @ManyToOne((type) => Account, (accounts) => Account, { eager: true })
  @JoinColumn()
  debitedAccount: Account;

  @ManyToOne((type) => Account, (accounts) => Account, { eager: true })
  @JoinColumn()
  creditedAccount: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.transaction_id) {
      this.transaction_id = uuid();
    }
  }
}
