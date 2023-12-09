import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StandardResponseFactory } from '../../../helpers/interceptors/formatter/standard-response.factory';
import { JoiValidationPipe } from '../../../helpers/joi/joi-validation.pipe';
import {
  PostCreateRawMaterialBodyDto,
  PostCreateRawMaterialBodyValidation,
} from './request-dto/create-raw-material.dto';

@ApiTags('Raw Material')
@Controller('api/v1/raw-material')
export class V1RawMaterialController {
  @ApiOkResponse({
    type: StandardResponseFactory({}),
  })
  @UsePipes(
    new JoiValidationPipe({
      body: PostCreateRawMaterialBodyValidation,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRawMaterial(
    @Body() body: PostCreateRawMaterialBodyDto,
  ): Promise<Record<string, never>> {
    return {};
  }
}
