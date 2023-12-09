import { Module } from '@nestjs/common';
import { V1CategoryController } from './category.controller';
import { CategoryModule } from '../../../common/category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [V1CategoryController],
})
export class V1CategoryModule {}
