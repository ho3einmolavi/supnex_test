import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RawMaterialModel } from './schemas/raw-material.schema';
import { RawMaterialDto } from './dtos/raw-material.dto';
import { ICreateRawMaterialServiceInput } from './interfaces/create-raw-material-service-input.interface';
import { Types } from 'mongoose';
import { IAddSupplierServiceInput } from './interfaces/add-supplier-service-input.interface';

@Injectable()
export class RawMaterialService {
  constructor(
    @InjectModel('RawMaterial')
    private readonly rawMaterialModel: RawMaterialModel,
  ) {}

  async create(data: ICreateRawMaterialServiceInput): Promise<RawMaterialDto> {
    return this.rawMaterialModel.create(data) as RawMaterialDto;
  }

  async getRawMaterialById(
    rawMaterialId: Types.ObjectId,
  ): Promise<RawMaterialDto> {
    return this.rawMaterialModel.findOne({
      _id: rawMaterialId,
    }) as RawMaterialDto;
  }

  async addSupplier(
    rawMaterialId: Types.ObjectId,
    data: IAddSupplierServiceInput,
  ): Promise<RawMaterialDto> {
    // Check if the offer with the given supplier already exists
    const existingOfferIndex = await this.rawMaterialModel.findOne({
      _id: rawMaterialId,
      'offers.supplier': data.supplier,
    });

    // If the offer exists, update the price; otherwise, add it to the offers array
    if (existingOfferIndex) {
      return this.rawMaterialModel.findOneAndUpdate(
        { _id: rawMaterialId, 'offers.supplier': data.supplier },
        { $set: { 'offers.$.price': data.price } },
        { new: true },
      );
    } else {
      return this.rawMaterialModel.findOneAndUpdate(
        { _id: rawMaterialId },
        { $addToSet: { offers: { $each: [data] } } },
        { new: true },
      );
    }
  }
}
