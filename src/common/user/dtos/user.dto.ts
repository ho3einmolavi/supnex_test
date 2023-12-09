import { ApiProperty } from '@nestjs/swagger';
import Joi from '../../../helpers/joi/joi';
import { Types } from 'mongoose';

export class UserDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  _id?: Types.ObjectId = Joi.objectId().required();

  @ApiProperty({
    type: String,
    required: true,
  })
  username: string = Joi.string().required();
}
