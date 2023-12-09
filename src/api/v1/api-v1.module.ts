import { Module } from '@nestjs/common';
import { V1RawMaterialModule } from './raw-material/raw-material.module';
import { V1SupplierModule } from './supplier/supplier.module';
import { V1CategoryModule } from './category/category.module';

@Module({
  imports: [V1RawMaterialModule, V1SupplierModule, V1CategoryModule],
})
export class V1ApiModule {}
