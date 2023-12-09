import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './schemas/product.schema';
import { ProductDto } from './dtos/product.dto';
import { InventoryService } from './../inventory/inventory.service';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: ProductModel,
    private readonly inventoryService: InventoryService,
  ) {}

  async addFakeProducts() {
    const fakeProducts: ProductDto[] = [
      {
        name: 'iphone 15',
        price: 100,
      },
      {
        name: 'macBook Air',
        price: 200,
      },
      {
        name: 'AirPod',
        price: 50,
      },
    ];
    const promises = fakeProducts.map(async ({ name, price }) => {
      const product = await this.productModel.findOneAndUpdate(
        {
          name,
        },
        {
          name,
          price,
        },
        {
          upsert: true,
          new: true,
        },
      );
      await this.inventoryService.createInventory({
        productId: product._id,
        quantity: Math.floor(Math.random() * (10 - 5) + 5),
      });
      return product;
    });
    return Promise.all(promises);
  }

  async getProductById(productId: Types.ObjectId): Promise<ProductDto> {
    return this.productModel.findOne({ _id: productId });
  }
}
