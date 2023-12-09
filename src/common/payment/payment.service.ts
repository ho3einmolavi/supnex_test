import { MelatGateway } from './gateway-providers/melat.gateway';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SamanGateway } from './gateway-providers/saman.gateway';
import { InitiatePaymentServiceInputInterface } from './interfaces/initiate-payment-input.interface';
import { GatewayType } from './enums/gateway-types.enum';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class PaymentService {
  private readonly paymentGateways: Record<string, any> = {};
  constructor(
    private readonly melatGateway: MelatGateway,
    private readonly samanGateway: SamanGateway,
    private readonly transactionService: TransactionService,
  ) {
    this.paymentGateways[GatewayType.Melat] = this.melatGateway;
    this.paymentGateways[GatewayType.Saman] = this.samanGateway;
  }

  async initiatePayment({
    gatewayType,
    price,
    quantity,
    productId,
    userId,
  }: InitiatePaymentServiceInputInterface): Promise<boolean> {
    const paymentGateway = this.paymentGateways[gatewayType];
    if (!paymentGateway) {
      throw new HttpException(
        'Invalid payment gateway type',
        HttpStatus.BAD_GATEWAY,
      );
    }
    const transaction = await this.transactionService.createTransaction({
      price,
      quantity,
      productId,
      userId,
      gateway: gatewayType,
    });
    const paymentSuccessful = await paymentGateway.initiatePayment({
      price,
    });
    if (paymentSuccessful) {
      await this.transactionService.makeTransactionSuccessful(transaction._id);
    }
    return paymentSuccessful;
  }
}
