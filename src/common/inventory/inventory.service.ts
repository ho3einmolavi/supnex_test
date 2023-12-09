import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InventoryModel } from './schemas/inventory.schema';
import { InventoryDto } from './dtos/inventory.dto';
import { Types } from 'mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel('Inventory')
    private readonly inventoryModel: InventoryModel,
  ) {}

  async createInventory(data: InventoryDto) {
    return this.inventoryModel.findOneAndUpdate(
      {
        productId: data.productId,
      },
      {
        productId: data.productId,
        quantity: data.quantity,
      },
      { upsert: true },
    );
  }

  async checkAvailability(
    productId: Types.ObjectId,
    quantity: number,
  ): Promise<boolean> {
    const productInventory = await this.inventoryModel.findOne({ productId });
    if (!productInventory) {
      throw new HttpException(
        `product Inventory with ID ${productId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return productInventory.quantity >= quantity;
  }

  async reduceProductQuantity(productId: Types.ObjectId, quantity: number) {
    const productInventory = await this.inventoryModel.findOne({ productId });

    if (!productInventory) {
      throw new HttpException(
        `Product Inventory with ID ${productId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (productInventory.quantity < quantity) {
      throw new HttpException(
        'Insufficient quantity in the inventory',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Reduce the quantity in the inventory
    productInventory.quantity -= quantity;
    return productInventory.save();
  }
}
