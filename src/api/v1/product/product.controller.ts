import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StandardResponseFactory } from '../../../helpers/interceptors/formatter/standard-response.factory';
import { JoiValidationPipe } from '../../../helpers/joi/joi-validation.pipe';
import {
  PurchaseProductBodyDto,
  PurchaseProductBodyValidation,
  PurchaseProductParamDto,
  PurchaseProductParamValidation,
} from './request-dto/purchase-product.dto';
import { PurchaseProductDto } from './response-dto/purchase-product.dto';
import { BaseAuthGuard } from '../../../app/guards/auth.guard';
import { UserDto } from '../../../common/user/dtos/user.dto';
import { User } from '../../../app/decorators/user.decorator';
import { InventoryService } from '../../../common/inventory/inventory.service';
import { PaymentService } from '../../../common/payment/payment.service';
import { ProductService } from '../../../common/product/product.service';

@ApiBearerAuth()
@UseGuards(BaseAuthGuard)
@ApiTags('Product')
@Controller('api/v1/product')
export class V1ProductController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
  ) {}

  @ApiOkResponse({
    type: StandardResponseFactory(PurchaseProductDto),
  })
  @UsePipes(
    new JoiValidationPipe({
      params: PurchaseProductParamValidation,
      body: PurchaseProductBodyValidation,
    }),
  )
  @HttpCode(HttpStatus.OK)
  @Post(':productId/purchase')
  async purchaseProduct(
    @Param() { productId }: PurchaseProductParamDto,
    @Body() { paymentGateway, quantity }: PurchaseProductBodyDto,
    @User() user: UserDto,
  ): Promise<PurchaseProductDto> {
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const productAvailable = await this.inventoryService.checkAvailability(
      productId,
      quantity,
    );

    if (!productAvailable) {
      throw new HttpException(
        'Product not available in the requested quantity',
        HttpStatus.BAD_REQUEST,
      );
    }

    const paymentSuccessful = await this.paymentService.initiatePayment({
      gatewayType: paymentGateway,
      price: product.price * quantity,
      quantity,
      userId: user._id,
      productId,
    });

    if (!paymentSuccessful) {
      throw new HttpException(
        'Payment failed. Unable to complete the purchase.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.inventoryService.reduceProductQuantity(productId, quantity);
    return { success: paymentSuccessful };
  }
}
