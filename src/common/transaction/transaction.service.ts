import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TranactionModel } from './schemas/transaction.schema';
import { CreateTransactionServiceInputInterface } from './interfaces/create-transaction-input.interface';
import { Types } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly tranactionModel: TranactionModel,
  ) {}

  async createTransaction(data: CreateTransactionServiceInputInterface) {
    return this.tranactionModel.create(data);
  }

  async makeTransactionSuccessful(transactionId: Types.ObjectId) {
    return this.tranactionModel.updateOne(
      { _id: transactionId },
      { successful: true },
    );
  }
}
