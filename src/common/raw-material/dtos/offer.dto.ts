import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class OfferDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  supplier: Types.ObjectId;

  @ApiProperty({
    type: Number,
    required: false,
  })
  price: number;
}
