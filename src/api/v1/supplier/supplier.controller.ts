import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StandardResponseFactory } from '../../../helpers/interceptors/formatter/standard-response.factory';
import { JoiValidationPipe } from '../../../helpers/joi/joi-validation.pipe';
import {
  PostCreateSupplierBodyDto,
  PostCreateSupplierBodyValidation,
} from './request-dto/create-supplier.dto';
import { SupplierService } from '../../../common/supplier/supplier.service';
import { CheckSupplierPhoneNumberPipe } from '../../../common/supplier/pipes/check-supplier-phone-number.pipe';
import { GetGetSuppliersListResponseDto } from './response-dto/get-suppliers-list.dto';

@ApiTags('Supplier')
@Controller('api/v1/supplier')
export class V1SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @ApiOkResponse({
    type: StandardResponseFactory({}),
  })
  @UsePipes(
    new JoiValidationPipe({
      body: PostCreateSupplierBodyValidation,
    }),
    CheckSupplierPhoneNumberPipe,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSupplier(
    @Body() body: PostCreateSupplierBodyDto,
  ): Promise<Record<string, never>> {
    await this.supplierService.create(body);
    return {};
  }

  @ApiOkResponse({
    type: StandardResponseFactory(GetGetSuppliersListResponseDto),
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getSuppliersList(): Promise<GetGetSuppliersListResponseDto> {
    const suppliers = await this.supplierService.getAll();
    return { suppliers };
  }
}
