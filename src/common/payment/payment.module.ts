import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MelatGateway } from './gateway-providers/melat.gateway';
import { SamanGateway } from './gateway-providers/saman.gateway';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  providers: [PaymentService, MelatGateway, SamanGateway],
  exports: [PaymentService],
})
export class PaymentModule {}
