import { Exclude, Expose } from 'class-transformer';
import { AssetType } from '../../enums/asset-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class AssetResponseDto {
  @Expose()
  @ApiProperty({
    example: 'A123',
    description: 'Unique alphanumeric code for the asset',
  })
  code: string;

  @Expose()
  @ApiProperty({
    example: AssetType.PARKING,
    description: 'Type of the asset',
    enum: AssetType,
  })
  assetType: AssetType;

  @Expose()
  @ApiProperty({
    example: false,
    description: 'Occupancy status of the asset',
    required: false,
  })
  isOccupied: boolean;
}
