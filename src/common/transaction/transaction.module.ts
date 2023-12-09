import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
