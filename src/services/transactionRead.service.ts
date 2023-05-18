import { AppDataSource } from "../data-source";

import { User } from "../entities/user.entity";
import { Transaction } from "../entities/transactions.entity";
import { compareDate } from "../schemas/dateCompare";

import { AppError } from "../errors/appErrors";

import { ITransactionRead } from "../interfaces";
import { Repository } from "typeorm";

const transactionReadService = async (
  username: string,
  typeTransaction: any,
  date: any
): Promise<ITransactionRead> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const transactionRepository: Repository<Transaction> =
    AppDataSource.getRepository(Transaction);

  const transactions: Transaction[] = await transactionRepository.find();

  const users: User[] = await userRepository.find();

  const user: User | undefined = users.find(
    (user) => user.username == username
  );

  if (!user) {
    throw new AppError(404, "user not found");
  }

  const debitTransactions: Transaction[] = transactions.filter(
    (transaction) => {
      return (
        transaction.debitedAccount.account_id == user.account.account_id &&
        compareDate(date, transaction.createdAt)
      );
    }
  );

  const creditTransactions: Transaction[] = transactions.filter(
    (transaction) => {
      return (
        transaction.creditedAccount.account_id == user.account.account_id &&
        compareDate(date, transaction.createdAt)
      );
    }
  );

  let response: ITransactionRead = {};

  if (typeTransaction == "cashIn") {
    response = {
      ...response,
      cashIn: creditTransactions,
    };
    return response;
  } else if (typeTransaction == "cashOut") {
    response = {
      ...response,
      cashOut: debitTransactions,
    };
    return response;
  }

  return {
    cashIn: creditTransactions,
    cashOut: debitTransactions,
  };
};

export default transactionReadService;
