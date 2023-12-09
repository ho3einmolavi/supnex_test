import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import Joi from '../../../helpers/joi/joi';
import { GatewayType } from '../../../common/payment/enums/gateway-types.enum';

export class TransactionDto {
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
    type: String,
    required: true,
  })
  userId: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: Number,
    required: true,
  })
  price: number = Joi.number().required();

  @ApiProperty({
    type: Number,
    required: true,
  })
  quantity: number = Joi.number().required();

  @ApiProperty({
    type: String,
    enum: Object.values(GatewayType),
    required: true,
  })
  gateway: GatewayType = Joi.string()
    .valid(...Object.values(GatewayType))
    .required();

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  successful?: boolean = Joi.boolean();
}
