import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RawMaterialService } from './../raw-material.service';

@Injectable()
export class CheckRawMaterialPipe implements PipeTransform {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type !== 'param') {
      return value;
    }
    const rawMaterial = await this.rawMaterialService.getRawMaterialById(
      value.rawMaterialId,
    );
    if (!rawMaterial) {
      throw new HttpException(
        'rawMaterial is not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
