import { Schema, Model } from 'mongoose';

export const InventorySchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export class InventoryModel extends Model {}

InventorySchema.loadClass(InventoryModel);
