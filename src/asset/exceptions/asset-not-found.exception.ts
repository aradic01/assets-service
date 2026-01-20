import { HttpException } from '@nestjs/common';

export class AssetNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}
