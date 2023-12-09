import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class SupplierDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  _id: Types.ObjectId;

  @ApiProperty({
    type: String,
    required: true,
  })
  fullName: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  phoneNumber: string;
}
