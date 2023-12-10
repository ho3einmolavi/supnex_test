import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SupplierModel } from './schemas/supplier.schema';
import { SupplierDto } from './dtos/supplier.dto';
import { ICreateSupplierServiceInput } from './interfaces/create-supplier-service-input.interface';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('Supplier')
    private readonly supplierModel: SupplierModel,
  ) {}

  async create(data: ICreateSupplierServiceInput): Promise<SupplierDto> {
    return this.supplierModel.create(data) as SupplierDto;
  }

  async getSupplierByPhoneNumber(phoneNumber: string): Promise<SupplierDto> {
    return this.supplierModel.findOne({ phoneNumber }) as SupplierDto;
  }

  async getSupplierById(supplierId: Types.ObjectId): Promise<SupplierDto> {
    return this.supplierModel.findOne({ _id: supplierId }) as SupplierDto;
  }

  async getAll(): Promise<SupplierDto[]> {
    return this.supplierModel.find(
      {},
      { fullName: true, phoneNumber: true },
    ) as SupplierDto[];
  }
}
