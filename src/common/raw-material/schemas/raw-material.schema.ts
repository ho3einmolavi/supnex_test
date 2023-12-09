import { Schema, Model } from 'mongoose';
import { UnitOfMeasurement } from '../enums/units-of-measurement.enum';

export const OfferSchema = new Schema(
  {
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false, timestamps: false },
);

export const RawMaterialSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    unitOfMeasurement: {
      type: String,
      enum: Object.values(UnitOfMeasurement),
      required: true,
    },
    offers: [
      {
        type: OfferSchema,
        required: false,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export class RawMaterialModel extends Model {}

RawMaterialSchema.loadClass(RawMaterialModel);
