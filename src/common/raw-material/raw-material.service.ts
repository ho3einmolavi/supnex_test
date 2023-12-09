import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RawMaterialModel } from './schemas/raw-material.schema';
import { RawMaterialDto } from './dtos/raw-material.dto';
import { ICreateRawMaterialServiceInput } from './interfaces/create-raw-material-service-input.interface';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectModel('RawMaterial')
    private readonly rawMaterialModel: RawMaterialModel,
  ) {}

  async create(data: ICreateRawMaterialServiceInput): Promise<RawMaterialDto> {
    return this.rawMaterialModel.create(data) as RawMaterialDto;
  }
}
