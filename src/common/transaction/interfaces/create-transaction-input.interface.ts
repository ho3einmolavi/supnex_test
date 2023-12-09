import { Types } from 'mongoose';
import { GatewayType } from '../../payment/enums/gateway-types.enum';

export interface CreateTransactionServiceInputInterface {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  price: number;
  gateway: GatewayType;
}
