import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from '../../../../common/category/dtos/category.dto';

export class GetGetCategoriesListResponseDto {
  @ApiProperty({ type: CategoryDto, isArray: true })
  categories: CategoryDto[];
}
