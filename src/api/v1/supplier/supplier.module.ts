import { Module } from '@nestjs/common';
import { V1SupplierController } from './supplier.controller';
import { SupplierModule } from '../../../common/supplier/supplier.module';

@Module({
  imports: [SupplierModule],
  controllers: [V1SupplierController],
})
export class V1SupplierModule {}
