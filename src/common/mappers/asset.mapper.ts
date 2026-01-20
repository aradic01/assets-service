import { plainToInstance } from 'class-transformer';
import { Asset, AssetType } from 'generated/prisma/client';
import { AssetResponseDto } from 'src/asset/dto/response/asset-response.dto';

export class AssetMapper {
  static toResponseDto(
    asset: Asset & { assetType?: AssetType },
  ): AssetResponseDto {
    return plainToInstance(
      AssetResponseDto,
      {
        ...asset,
        assetType: asset.assetType?.name,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toResponseDtoList(
    assets: (Asset & { assetType?: AssetType })[],
  ): AssetResponseDto[] {
    return assets.map((asset) => this.toResponseDto(asset));
  }
}
