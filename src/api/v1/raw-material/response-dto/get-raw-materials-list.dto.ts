import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UnitOfMeasurement } from '../../../../common/raw-material/enums/units-of-measurement.enum';
import { SupplierDto } from '../../../../common/supplier/dtos/supplier.dto';

export class SupplierItemDto extends SupplierDto {
  @ApiProperty({
    type: Number,
    required: true,
  })
  price: number;
}

export class RawMaterialItemDto {
  @ApiProperty({ type: String, required: true })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  category: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: Object.values(UnitOfMeasurement),
  })
  unitOfMeasurement: UnitOfMeasurement;

  @ApiProperty({
    type: SupplierItemDto,
    required: true,
    isArray: true,
  })
  suppliers: SupplierItemDto[];

  @ApiProperty({
    type: Number,
    required: true,
  })
  stock: number;
}

export class GetGetRawMaterialsListResponseDto {
  @ApiProperty({ type: RawMaterialItemDto, isArray: true })
  rawMaterials: RawMaterialItemDto[];
}
