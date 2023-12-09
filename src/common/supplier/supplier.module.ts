import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from './schemas/supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Supplier',
        schema: SupplierSchema,
      },
    ]),
  ],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
