import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Account } from "./accounts.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly user_id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToOne((type) => Account, (user) => User)
  @JoinColumn({ name: "account_id" })
  account: Account;

  constructor() {
    if (!this.user_id) {
      this.user_id = uuid();
    }
  }
}
