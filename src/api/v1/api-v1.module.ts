import { Module } from '@nestjs/common';
import { V1ProductModule } from './product/product.module';

@Module({
  imports: [V1ProductModule],
})
export class V1ApiModule {}
