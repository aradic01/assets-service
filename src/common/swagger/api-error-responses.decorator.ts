import { applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ErrorExamples } from './error-examples';
import { ErrorResponseDto } from '../dto/error-response.dto';

type ErrorKey = keyof typeof ErrorExamples;

export function ApiErrorResponses(errorKeys: readonly ErrorKey[]) {
  return applyDecorators(
    ...errorKeys.map((key) => {
      const error = ErrorExamples[key];
      return ApiResponse({
        status: error.status,
        description: error.description,
        content: {
          'application/json': {
            schema: { $ref: getSchemaPath(ErrorResponseDto) },
            example: error.value,
          },
        },
      });
    }),
  );
}
