import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ErrorResponseDto {
  @Expose()
  @ApiProperty({
    example: 400,
    description: 'HTTP status code of the error',
  })
  statusCode: number;

  @Expose()
  @ApiProperty({
    example: 'BadRequestException',
    description: 'Application-specific error code',
  })
  errorCode: string;

  @Expose()
  @ApiProperty({
    example: 'Given code must be alphanumeric and exactly 4 characters long.',
    description: 'Detailed error message',
  })
  message: string;

  @Expose()
  @ApiProperty({
    example: '2024-06-01T12:34:56.789Z',
    description: 'Timestamp of when the error occurred',
  })
  timestamp: string;

  @Expose()
  @ApiProperty({
    example: '/assets',
    description: 'The API path where the error occurred',
  })
  apiPath?: string;
}
