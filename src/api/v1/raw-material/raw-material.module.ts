import { Module } from '@nestjs/common';
import { V1RawMaterialController } from './raw-material.controller';

@Module({
  imports: [],
  controllers: [V1RawMaterialController],
})
export class V1RawMaterialModule {}
