import { Schema, Model } from 'mongoose';

export const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export class CategoryModel extends Model {}

CategorySchema.loadClass(CategoryModel);
