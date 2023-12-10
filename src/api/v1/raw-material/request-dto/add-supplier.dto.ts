import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import Joi from '../../../../helpers/joi/joi';

export class PostAddSupplierBodyDto {
  @ApiProperty({
    type: Number,
    minimum: 0,
    required: true,
  })
  readonly price: number = Joi.number().min(0).required();

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly supplierId: Types.ObjectId = Joi.objectId().required();
}

export class PostAddSupplierParamDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly rawMaterialId: Types.ObjectId = Joi.objectId().required();
}

export const PostAddSupplierBodyValidation = Joi.object(
  new PostAddSupplierBodyDto(),
);

export const PostAddSupplierParamValidation = Joi.object(
  new PostAddSupplierParamDto(),
);
