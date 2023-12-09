import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../helpers/joi/joi';
import { Types } from 'mongoose';

export class ProductDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  _id?: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string = Joi.string().required();

  @ApiProperty({
    type: Number,
    required: true,
  })
  price: number = Joi.number().required();
}
