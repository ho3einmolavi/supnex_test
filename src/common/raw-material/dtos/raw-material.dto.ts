import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UnitOfMeasurement } from '../enums/units-of-measurement.enum';

export class RawMaterialDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  _id: Types.ObjectId;

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  category: Types.ObjectId;

  @ApiProperty({
    type: String,
    enum: Object.values(UnitOfMeasurement),
    required: true,
  })
  unitOfMeasurement: UnitOfMeasurement;

  @ApiProperty({
    type: String,
    isArray: true,
    required: true,
  })
  suppliers: Types.ObjectId[];

  @ApiProperty({
    type: Number,
    minimum: 0,
    required: true,
  })
  stock: number;
}
