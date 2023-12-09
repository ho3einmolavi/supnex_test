import { Schema, Model } from 'mongoose';

export const SupplierSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

export class SupplierModel extends Model {}

SupplierSchema.loadClass(SupplierModel);
