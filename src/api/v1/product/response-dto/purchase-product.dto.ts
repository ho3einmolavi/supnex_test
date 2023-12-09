import { ApiProperty } from '@nestjs/swagger';

export class PurchaseProductDto {
  @ApiProperty({ type: Boolean })
  success: boolean;
}
