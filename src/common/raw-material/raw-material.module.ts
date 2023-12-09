import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterialSchema } from './schemas/raw-material.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RawMaterial',
        schema: RawMaterialSchema,
      },
    ]),
  ],
  providers: [RawMaterialService],
  exports: [RawMaterialService],
})
export class RawMaterialModule {}
