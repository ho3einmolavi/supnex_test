import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CategoryService } from '../category.service';

@Injectable()
export class CheckCategoryNamePipe implements PipeTransform {
  constructor(private readonly categoryService: CategoryService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type !== 'body') {
      return value;
    }
    const lowerCaseName = value.name.toLowerCase();
    const category = await this.categoryService.getCategoryByName(
      lowerCaseName,
    );
    if (category) {
      throw new HttpException(
        'category is already exists with this name',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value, name: lowerCaseName };
  }
}
