import { Types } from 'mongoose';
import { GatewayType } from '../enums/gateway-types.enum';

export interface InitiatePaymentServiceInputInterface {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  price: number;
  gatewayType: GatewayType;
}
