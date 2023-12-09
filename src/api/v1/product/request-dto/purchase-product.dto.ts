import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import Joi from '../../../../helpers/joi/joi';
import { GatewayType } from '../../../../common/payment/enums/gateway-types.enum';

export class PurchaseProductParamDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly productId: Types.ObjectId = Joi.objectId();
}

export class PurchaseProductBodyDto {
  @ApiProperty({
    type: String,
    required: true,
    enum: Object.values(GatewayType),
  })
  readonly paymentGateway: GatewayType = Joi.string()
    .valid(...Object.values(GatewayType))
    .required();

  @ApiProperty({
    type: Number,
    required: true,
    minLength: 1,
  })
  readonly quantity: number = Joi.number().min(1).required();
}

export const PurchaseProductBodyValidation = Joi.object(
  new PurchaseProductBodyDto(),
);

export const PurchaseProductParamValidation = Joi.object(
  new PurchaseProductParamDto(),
);
