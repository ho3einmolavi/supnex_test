import { Schema, Model } from 'mongoose';
import { UnitOfMeasurement } from '../enums/units-of-measurement.enum';

export const RawMaterialSchema = new Schema(
  {
    name: {
      type: String,
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
    suppliers: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }],
    stock: {
      type: Number,
      required: true,
      min: 0,
      integer: true,
    },
  },
  { timestamps: true },
);

export class RawMaterialModel extends Model {}

RawMaterialSchema.loadClass(RawMaterialModel);
