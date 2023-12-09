import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CategoryDto {
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
}
