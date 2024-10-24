import { addUserBalances, User } from '../src/clients/database.client';

describe('addUserBalances', () => {
  it('should correctly add user balances', () => {
    const user: User = {
      id: '123',
      balance: 100,
      earned: 50,
      spent: 30,
      payout: 20,
      paidOut: 10
    };

    const userBalanceDelta: User = {
      id: '123',
      balance: 0,
      earned: 20,
      spent: 10,
      payout: 5,
      paidOut: 5
    };

    const expectedResult: User = {
      id: '123',
      balance: 65,
      earned: 70,
      spent: 40,
      payout: 15,
      paidOut: 15
    };

    expect(addUserBalances(user, userBalanceDelta)).toEqual(expectedResult);
  });

  it('should handle negative balances correctly', () => {
    const user: User = {
      id: '123',
      balance: 50,
      earned: 25,
      spent: 20,
      payout: 40,
      paidOut: 5
    };

    const userBalanceDelta: User = {
      id: '123',
      balance: 0,
      earned: 10,
      spent: 5,
      payout: 25,
      paidOut: 10
    };

    const expectedResult: User = {
      id: '123',
      balance: -20,
      earned: 35,
      spent: 25,
      payout: 15,
      paidOut: 15
    };

    expect(addUserBalances(user, userBalanceDelta)).toEqual(expectedResult);
  });

  it('should handle zero deltas correctly', () => {
    const user: User = {
      id: '123',
      balance: 50,
      earned: 25,
      spent: 20,
      payout: 10,
      paidOut: 5
    };

    const userBalanceDelta: User = {
      id: '123',
      balance: 0,
      earned: 0,
      spent: 0,
      payout: 0,
      paidOut: 0
    };

    const expectedResult: User = {
      id: '123',
      balance: 40,
      earned: 25,
      spent: 20,
      payout: 10,
      paidOut: 5
    };

    expect(addUserBalances(user, userBalanceDelta)).toEqual(expectedResult);
  });
});