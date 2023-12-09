import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventorySchema } from './schemas/inventory.schema';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Inventory',
        schema: InventorySchema,
      },
    ]),
  ],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
