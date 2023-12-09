import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../helpers/joi/joi';
import { Types } from 'mongoose';

export class InventoryDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  _id?: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: String,
    required: true,
  })
  productId: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: Number,
    required: true,
  })
  quantity: number = Joi.number().required();
}
