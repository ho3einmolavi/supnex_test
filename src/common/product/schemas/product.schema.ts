import { Schema, Model } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export class ProductModel extends Model {}

ProductSchema.loadClass(ProductModel);
