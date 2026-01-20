import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/request/create-asset.dto';
import { UpdateAssetDto } from './dto/request/update-asset.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssetResponseDto } from './dto/response/asset-response.dto';
import { ApiErrorResponses } from 'src/common/swagger/api-error-responses.decorator';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';

@Controller({
  path: 'assets',
  version: '1',
})
@ApiTags('assets')
@ApiErrorResponses(['BAD_REQUEST', 'INTERNAL_SERVER_ERROR'])
@ApiExtraModels(ErrorResponseDto)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({
    status: 201,
    description: 'The asset has been created.',
    type: AssetResponseDto,
  })
  @ApiErrorResponses(['CONFLICT'])
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assets' })
  @ApiResponse({
    status: 200,
    description: 'Returns all assets.',
    type: [AssetResponseDto],
  })
  findAll() {
    return this.assetService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get an asset by code' })
  @ApiResponse({
    status: 200,
    description: 'Returns the asset with the specified code.',
    type: AssetResponseDto,
  })
  @ApiErrorResponses(['NOT_FOUND'])
  findOne(@Param('code') code: string) {
    return this.assetService.findOne(code);
  }

  @Patch(':code')
  @ApiOperation({ summary: 'Update an asset by code' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been updated.',
    type: AssetResponseDto,
  })
  @ApiErrorResponses(['NOT_FOUND'])
  update(@Param('code') code: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.editAsset(code, updateAssetDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Delete an asset by code' })
  @ApiResponse({
    status: 204,
  })
  @ApiErrorResponses(['NOT_FOUND'])
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('code') code: string) {
    return this.assetService.remove(code);
  }
}
