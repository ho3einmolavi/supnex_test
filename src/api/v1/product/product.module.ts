import { Module } from '@nestjs/common';
import { V1ProductController } from './product.controller';
import { UserModule } from '../../../common/user/user.module';
import { InventoryModule } from '../../../common/inventory/inventory.module';
import { ProductModule } from '../../../common/product/product.module';
import { PaymentModule } from '../../../common/payment/payment.module';

@Module({
  imports: [UserModule, InventoryModule, ProductModule, PaymentModule],
  controllers: [V1ProductController],
})
export class V1ProductModule {}
