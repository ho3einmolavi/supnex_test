import { Types } from 'mongoose';

export interface IAddSupplierServiceInput {
  supplier: Types.ObjectId;
  price: number;
}
