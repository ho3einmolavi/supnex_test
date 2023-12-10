import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
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
import { CategoryService } from '../../../common/category/category.service';
import { RawMaterialService } from '../../../common/raw-material/raw-material.service';
import {
  PostAddSupplierBodyDto,
  PostAddSupplierBodyValidation,
  PostAddSupplierParamDto,
  PostAddSupplierParamValidation,
} from './request-dto/add-supplier.dto';
import { CheckRawMaterialPipe } from '../../../common/raw-material/pipes/check-raw-material.pipe';
import { CheckSupplierDataPipe } from '../../../common/raw-material/pipes/check-supplier-data.pipe';

@ApiTags('Raw Material')
@Controller('api/v1/raw-material')
export class V1RawMaterialController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly rawMaterialService: RawMaterialService,
  ) {}

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
    @Body()
    { name, categoryId, unitOfMeasurement }: PostCreateRawMaterialBodyDto,
  ): Promise<Record<string, never>> {
    const category = await this.categoryService.getById(categoryId);
    if (!category) {
      throw new HttpException('category is not found', HttpStatus.BAD_REQUEST);
    }
    await this.rawMaterialService.create({
      name,
      category: categoryId,
      unitOfMeasurement,
    });
    return {};
  }

  @ApiOkResponse({
    type: StandardResponseFactory({}),
  })
  @UsePipes(
    new JoiValidationPipe({
      body: PostAddSupplierBodyValidation,
      params: PostAddSupplierParamValidation,
    }),
    CheckRawMaterialPipe,
    CheckSupplierDataPipe,
  )
  @HttpCode(HttpStatus.OK)
  @Post('add-supplier/:rawMaterialId')
  async addSupplier(
    @Body() { supplierId, price }: PostAddSupplierBodyDto,
    @Param() { rawMaterialId }: PostAddSupplierParamDto,
  ): Promise<Record<string, never>> {
    await this.rawMaterialService.addSupplier(rawMaterialId, {
      supplier: supplierId,
      price,
    });
    return {};
  }
}
