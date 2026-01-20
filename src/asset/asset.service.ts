import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetDto } from './dto/request/create-asset.dto';
import { UpdateAssetDto } from './dto/request/update-asset.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AssetResponseDto } from './dto/response/asset-response.dto';
import { Prisma } from '../../generated/prisma/client';
import { AssetAlreadyExistsException } from './exceptions/asset-already-exists.exception';
import { PrismaErrorCodes } from 'src/common/constants/prisma-error-codes';
import { AssetNotFoundException } from './exceptions/asset-not-found.exception';
import { AssetMapper } from 'src/common/mappers/asset.mapper';

@Injectable()
export class AssetService {
  private logger: Logger = new Logger(AssetService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    this.logger.log(`Creating asset with code: ${createAssetDto.code}`);
    try {
      const assetData = await this.prismaService.asset.create({
        data: {
          ...createAssetDto,
          assetType: {
            connect: {
              name: createAssetDto.assetType,
            },
          },
        },
        include: {
          assetType: true,
        },
      });

      return AssetMapper.toResponseDto(assetData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCodes.UNIQUE_CONSTRAINT_VIOLATION) {
          throw new AssetAlreadyExistsException(
            `Asset with code ${createAssetDto.code} already exists!`,
          );
        }
      }
      throw error;
    }
  }

  async findAll(): Promise<AssetResponseDto[]> {
    this.logger.log('Fetching all assets');
    const assets = await this.prismaService.asset.findMany({
      include: {
        assetType: true,
      },
    });

    return AssetMapper.toResponseDtoList(assets);
  }

  async findOne(code: string): Promise<AssetResponseDto> {
    this.logger.log(`Fetching asset with code: ${code}`);
    const asset = await this.prismaService.asset.findUnique({
      where: { code },
      include: {
        assetType: true,
      },
    });

    if (!asset) {
      throw new AssetNotFoundException(`Asset with code ${code} not found`);
    }

    return AssetMapper.toResponseDto(asset);
  }

  async editAsset(
    code: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<AssetResponseDto> {
    this.logger.log(`Updating asset with code: ${code}`);

    const { assetType, ...assetData } = updateAssetDto;
    const asset = await this.prismaService.asset.findUnique({
      where: { code },
    });

    if (!asset) {
      throw new AssetNotFoundException(`Asset with code ${code} not found`);
    }

    const updatedAsset = await this.prismaService.asset.update({
      where: { code },
      data: {
        ...assetData,
        ...(assetType && {
          assetType: {
            connect: {
              name: assetType,
            },
          },
        }),
      },
      include: {
        assetType: true,
      },
    });

    return AssetMapper.toResponseDto(updatedAsset);
  }

  async remove(code: string): Promise<void> {
    this.logger.log(`Deleting asset with code: ${code}`);
    const asset = await this.prismaService.asset.findUnique({
      where: { code },
    });

    if (!asset) {
      throw new AssetNotFoundException(`Asset with code ${code} not found`);
    }

    await this.prismaService.asset.delete({
      where: { code },
    });
  }
}
