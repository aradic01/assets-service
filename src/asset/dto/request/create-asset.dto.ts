import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { AssetType } from '../../enums/asset-type.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(4)
  @ApiProperty({
    example: 'A123',
    description: 'Unique alphanumeric code for the asset',
    minLength: 4,
    maxLength: 4,
  })
  code: string;

  @IsEnum(AssetType)
  @IsNotEmpty()
  @Transform(({ value }) => value as AssetType)
  @ApiProperty({
    example: AssetType.PARKING,
    description: 'Type of the asset',
    enum: AssetType,
  })
  assetType: AssetType;

  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'Occupancy status of the asset',
    required: false,
  })
  isOccupied?: boolean;
}
