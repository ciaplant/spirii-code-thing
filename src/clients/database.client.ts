import { Injectable } from '@nestjs/common';
import { randomIntFromInterval } from '../util/random';

export interface User {
  id: UserId;
  balance: number;
  earned: number;
  spent: number;
  payout: number;
  paidOut: number;
}

interface IDictionary<T> {
  [key: string]: T;
}

// TODO: Replace with postgres
const inMemoryUserbase: IDictionary<User> = {
  "1": {
    id: "1",
    balance: randomIntFromInterval(0, 1000),
    earned: randomIntFromInterval(0, 10000),
    spent: randomIntFromInterval(0, 5000),
    payout: randomIntFromInterval(0, 3000),
    paidOut: randomIntFromInterval(0, 2000),
  },
  "2": {
    id: "2",
    balance: randomIntFromInterval(0, 1000),
    earned: randomIntFromInterval(0, 10000),
    spent: randomIntFromInterval(0, 5000),
    payout: randomIntFromInterval(0, 3000),
    paidOut: randomIntFromInterval(0, 2000),
  },
  "3": {
    id: "3",
    balance: randomIntFromInterval(0, 1000),
    earned: randomIntFromInterval(0, 10000),
    spent: randomIntFromInterval(0, 5000),
    payout: randomIntFromInterval(1, 3000),
    paidOut: randomIntFromInterval(0, 2000),
  },
  "4": {
    id: "4",
    balance: randomIntFromInterval(0, 1000),
    earned: randomIntFromInterval(0, 10000),
    spent: randomIntFromInterval(0, 5000),
    payout: randomIntFromInterval(1, 3000),
    paidOut: randomIntFromInterval(0, 2000),
  },
};

@Injectable()
export class DatabaseClient {
  insertOrUpdateUser(user: User){
    let userFromDb = inMemoryUserbase[user.id];

    if (userFromDb == null) {
      inMemoryUserbase[user.id] = user;
    } else {
      inMemoryUserbase[user.id] = addUserBalances(userFromDb, user);
    }
  }

  getUser(userId: UserId): User {
    return inMemoryUserbase[userId];
  }

  getAllUsers(): User[] {
    return Object.values(inMemoryUserbase);
  }

  getRequestedPayouts(){
    return Object.values(inMemoryUserbase).filter(user => user.payout > 0);
  }
}

// This could possibly go into the user service with some amount of controls
// TODO: This absolutely needs a bunch of tests as changing this logic means changing the business
// TODO: This should not be in the database client code but somewhere else to contain business logic
export function addUserBalances(user: User, userBalanceDelta: User): User {
  return {
    id: `${user.id}`,
    balance: user.balance - userBalanceDelta.spent - userBalanceDelta.payout,
    earned: user.earned + userBalanceDelta.earned,
    spent: user.spent + userBalanceDelta.spent,
    payout: user.payout - userBalanceDelta.payout,
    paidOut: user.paidOut + userBalanceDelta.paidOut,
  };
}
