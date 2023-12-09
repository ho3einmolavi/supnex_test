import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../../helpers/joi/joi';

export class PostCreateRawMaterialBodyDto {
  @ApiProperty({
    type: Number,
    required: true,
    minLength: 1,
  })
  readonly quantity: number = Joi.number().min(1).required();
}

export const PostCreateRawMaterialBodyValidation = Joi.object(
  new PostCreateRawMaterialBodyDto(),
);
