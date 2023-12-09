import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UnitOfMeasurement } from '../enums/units-of-measurement.enum';
import { OfferDto } from './offer.dto';

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
    type: OfferDto,
    isArray: true,
    required: false,
  })
  offers?: OfferDto[];

  @ApiProperty({
    type: Number,
    minimum: 0,
    required: true,
  })
  stock: number;
}
