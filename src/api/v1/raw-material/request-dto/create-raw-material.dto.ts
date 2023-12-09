import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import Joi from '../../../../helpers/joi/joi';
import { UnitOfMeasurement } from '../../../../common/raw-material/enums/units-of-measurement.enum';

export class PostCreateRawMaterialBodyDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  readonly name: string = Joi.string().required();

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly categoryId: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: String,
    enum: Object.values(UnitOfMeasurement),
    required: true,
  })
  readonly unitOfMeasurement: UnitOfMeasurement = Joi.string()
    .valid(...Object.values(UnitOfMeasurement))
    .required();
}

export const PostCreateRawMaterialBodyValidation = Joi.object(
  new PostCreateRawMaterialBodyDto(),
);
