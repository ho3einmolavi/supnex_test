import { Injectable } from '@nestjs/common';
import { PaymentGatewayInterface } from '../interfaces/payment-gateway.interface';

@Injectable()
export class MelatGateway implements PaymentGatewayInterface {
  async initiatePayment(paymentData: any): Promise<boolean> {
    // Implement logic to initiate payment with MelatGateway
    // Return the result of the payment initiation
    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    // Set the success probability (65% success rate)
    const successProbability = 0.65;
    return randomValue <= successProbability;
  }
}
