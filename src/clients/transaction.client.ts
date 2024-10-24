import { Injectable } from '@nestjs/common';
import { randomIntFromInterval } from '../util/random';

type TransactionId = string;
type TransactionType = "earned" | "spent" | "payout";

export interface Transaction {
  id: TransactionId;
  userId: UserId;
  createdAt: Date;
  type: TransactionType;
  amount: number;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface TransactionResponse {
  items: Transaction[];
  meta: Meta;
}

let timesCalled = 0;

// this client returns mock data, TODO: Move mock into container for better collaboration
// Livnote: This is the kind of thing that would be a great hand off to a junior engineer.
// We have this service which is mocked poorly and hastily, make it better
@Injectable()
export class TransactionClient {
  getTransaction(startDate: Date, endDate: Date): TransactionResponse {
    timesCalled += 1;

    // TODO: Should be a real error, maybe a result type?
    if (timesCalled == 1000){
      return { items: [], meta: undefined }
    }

    return {
      items: [
        {
          amount: Math.random() * 100,
          createdAt: startDate,
          id: "1",
          type: getRandomTransactionType(),
          userId: randomIntFromInterval(100, 100000).toString(),
        },
        {
          amount: Math.random() * 100,
          createdAt: startDate,
          id: "2",
          type: getRandomTransactionType(),
          userId: randomIntFromInterval(100, 100000).toString(),
        },
        {
          amount: Math.random() * 100,
          createdAt: startDate,
          id: "3",
          type: getRandomTransactionType(),
          userId: randomIntFromInterval(100, 100000).toString(),
        },
        {
          amount: Math.random() * 100,
          createdAt: startDate,
          id: "3",
          type: getRandomTransactionType(),
          userId: randomIntFromInterval(100, 100000).toString(),
        },
        {
          amount: Math.random() * 100,
          createdAt: startDate,
          id: "3",
          type: getRandomTransactionType(),
          userId: randomIntFromInterval(100, 100000).toString(),
        },
      ],
      meta: {
        totalItems: 1200,
        itemCount: 3,
        itemsPerPage: 3,
        totalPages: 400,
        currentPage: 1,
      },
    };
  }
}

function getRandomTransactionType(): TransactionType {
  const typesArray: TransactionType[] = ["earned", "spent", "payout"];
  const randomIndex = Math.floor(Math.random() * typesArray.length);
  return typesArray[randomIndex];
}
