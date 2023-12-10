import { Module } from '@nestjs/common';
import { V1RawMaterialController } from './raw-material.controller';
import { CategoryModule } from '../../../common/category/category.module';
import { RawMaterialModule } from '../../../common/raw-material/raw-material.module';
import { SupplierModule } from '../../../common/supplier/supplier.module';

@Module({
  imports: [CategoryModule, RawMaterialModule, SupplierModule],
  controllers: [V1RawMaterialController],
})
export class V1RawMaterialModule {}
