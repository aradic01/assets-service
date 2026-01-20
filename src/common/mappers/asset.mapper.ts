import { plainToInstance } from 'class-transformer';
import { Asset, AssetType } from 'generated/prisma/client';
import { AssetResponseDto } from 'src/asset/dto/response/asset-response.dto';

export class AssetMapper {
  static toResponseDto(asset: Asset, assetType: AssetType): AssetResponseDto {
    return plainToInstance(
      AssetResponseDto,
      {
        ...asset,
        assetType: assetType?.name ?? undefined,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toResponseDtoList(
    assets: Asset[],
    assetTypes: AssetType[],
  ): AssetResponseDto[] {
    return plainToInstance(
      AssetResponseDto,
      assets.map((asset, index) => ({
        ...asset,
        assetType: assetTypes[index]?.name ?? undefined,
      })),
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
