import { ApiProperty } from '@nestjs/swagger';
import { SupplierDto } from '../../../../common/supplier/dtos/supplier.dto';

export class GetGetSuppliersListResponseDto {
  @ApiProperty({ type: SupplierDto, isArray: true })
  suppliers: SupplierDto[];
}
