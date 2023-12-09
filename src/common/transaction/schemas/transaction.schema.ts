import { Schema, Model } from 'mongoose';
import { GatewayType } from 'src/common/payment/enums/gateway-types.enum';

export const TransactionSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    gateway: {
      type: String,
      enum: Object.values(GatewayType),
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    successful: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export class TranactionModel extends Model {}

TransactionSchema.loadClass(TranactionModel);
