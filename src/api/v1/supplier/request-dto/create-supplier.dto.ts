import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../../helpers/joi/joi';
import { PHONE_NUMBER_REGEX } from '../../../../helpers/constants/constant';

export class PostCreateSupplierBodyDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly fullName: string = Joi.string().required();

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly phoneNumber: string = Joi.string()
    .pattern(PHONE_NUMBER_REGEX)
    .required();
}

export const PostCreateSupplierBodyValidation = Joi.object(
  new PostCreateSupplierBodyDto(),
);
