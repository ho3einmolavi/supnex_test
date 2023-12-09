import { Types } from 'mongoose';
import { UnitOfMeasurement } from './../enums/units-of-measurement.enum';

export interface ICreateRawMaterialServiceInput {
  name: string;
  category: Types.ObjectId;
  unitOfMeasurement: UnitOfMeasurement;
}
