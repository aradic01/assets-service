import { HttpException } from '@nestjs/common';

export class AssetAlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}
