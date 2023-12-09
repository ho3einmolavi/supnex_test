import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StandardResponseFactory } from '../../../helpers/interceptors/formatter/standard-response.factory';
import { JoiValidationPipe } from '../../../helpers/joi/joi-validation.pipe';
import { CategoryService } from '../../../common/category/category.service';
import {
  PostCreateCategoryBodyDto,
  PostCreateCategoryBodyValidation,
} from './request-dto/create-category.dto';
import { CheckCategoryNamePipe } from '../../../common/category/pipes/check-category-name.pipe';
import { GetGetCategoriesListResponseDto } from './response-dto/get-categories-list.dto';

@ApiTags('Category')
@Controller('api/v1/category')
export class V1CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({
    type: StandardResponseFactory({}),
  })
  @UsePipes(
    new JoiValidationPipe({
      body: PostCreateCategoryBodyValidation,
    }),
    CheckCategoryNamePipe,
  )
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCategory(
    @Body() { name }: PostCreateCategoryBodyDto,
  ): Promise<Record<string, never>> {
    await this.categoryService.create(name);
    return {};
  }

  @ApiOkResponse({
    type: StandardResponseFactory(GetGetCategoriesListResponseDto),
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getCategoriesList(): Promise<GetGetCategoriesListResponseDto> {
    const categories = await this.categoryService.getAll();
    return { categories };
  }
}
