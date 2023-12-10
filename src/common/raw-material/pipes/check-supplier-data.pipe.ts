import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SupplierService } from '../../../common/supplier/supplier.service';

@Injectable()
export class CheckSupplierDataPipe implements PipeTransform {
  constructor(private readonly supplierService: SupplierService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type !== 'body') {
      return value;
    }
    const supplier = await this.supplierService.getSupplierById(
      value.supplierId,
    );
    if (!supplier) {
      throw new HttpException('supplier is not found', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
