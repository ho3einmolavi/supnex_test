import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './schemas/category.schema';
import { CategoryDto } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: CategoryModel,
  ) {}

  async create(name: string): Promise<CategoryDto> {
    return this.categoryModel.create({ name }) as CategoryDto;
  }

  async getCategoryByName(name: string): Promise<CategoryDto> {
    return this.categoryModel.findOne({ name }) as CategoryDto;
  }

  async getAll(): Promise<CategoryDto[]> {
    return this.categoryModel.find({}, { name: true }) as CategoryDto[];
  }
}
