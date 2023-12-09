import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SupplierService } from '../supplier.service';

@Injectable()
export class CheckSupplierPhoneNumberPipe implements PipeTransform {
  constructor(private readonly supplierService: SupplierService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (type !== 'body') {
      return value;
    }
    const supplier = await this.supplierService.getSupplierByPhoneNumber(
      value.phoneNumber,
    );
    if (supplier) {
      throw new HttpException(
        'supplier is already exists with this phone number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
