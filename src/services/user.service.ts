import { Injectable } from '@nestjs/common';
import { DatabaseClient, User } from '../clients/database.client';
import { Transaction, TransactionClient } from '../clients/transaction.client';

export interface PayoutsUser {
  id: UserId,
  payout: number
}

// TODO: Add results which can be interpreted as http codes in controllers
@Injectable()
export class UserService {
  constructor(
    private readonly databaseClient: DatabaseClient,
    private readonly transactionClient: TransactionClient,
  ) {}

  updateTransactions() {
    let transactions = this.transactionClient.getTransaction(
      new Date(),
      new Date('2001-09-11'),
    );

    // TODO: Add metadata handling

    transactions.items.map((transaction) =>
      this.databaseClient.insertOrUpdateUser(userFromTransaction(transaction)),
    );
  }

  getUser(userId: UserId): User {
    return this.databaseClient.getUser(userId);
  }

  getAllUsers(): User[]{
    return this.databaseClient.getAllUsers();
  }

  getRequestedPayouts(): PayoutsUser[] {
    return this.databaseClient.getRequestedPayouts().map(userToPayoutsUser);
  }
}

function userFromTransaction(transaction: Transaction) : User {
  return {
    id: transaction.userId,
    balance: transaction.amount,
    earned: transaction.type === "earned" ? transaction.amount : 0,
    paidOut: transaction.type === "payout" ? transaction.amount : 0,
    payout: transaction.type === "payout" ? transaction.amount : 0,
    spent: transaction.type === "spent" ? transaction.amount : 0,
  };
}

function userToPayoutsUser(user: User): PayoutsUser {
  return {
    id: user.id,
    payout: user.payout,
  };
}