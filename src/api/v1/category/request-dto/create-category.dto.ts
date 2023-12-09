import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../../helpers/joi/joi';

export class PostCreateCategoryBodyDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly name: string = Joi.string().required();
}

export const PostCreateCategoryBodyValidation = Joi.object(
  new PostCreateCategoryBodyDto(),
);
