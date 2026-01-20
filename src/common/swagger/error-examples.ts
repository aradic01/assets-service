export interface ErrorExample {
  status: number;
  description: string;
  value: unknown;
}

export const ErrorExamples: Record<string, ErrorExample> = {
  BAD_REQUEST: {
    status: 400,
    description: 'Bad Request',
    value: {
      statusCode: 400,
      message: 'Invalid input data',
      errorCode: 'BadRequestException',
      timestamp: '2024-06-01T12:34:56.789Z',
      apiPath: '/assets',
    },
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    description: 'Internal Server Error',
    value: {
      statusCode: 500,
      message: 'An unexpected error occurred',
      errorCode: 'InternalServerErrorException',
      timestamp: '2024-06-01T12:34:56.789Z',
      apiPath: '/assets',
    },
  },
  CONFLICT: {
    status: 409,
    description: 'Conflict when resource already exists',
    value: {
      statusCode: 409,
      message: 'Resource already exists',
      errorCode: 'AssetAlreadyExistsException',
      timestamp: '2024-06-01T12:34:56.789Z',
      apiPath: '/assets',
    },
  },
  NOT_FOUND: {
    status: 404,
    description: 'Resource Not Found',
    value: {
      statusCode: 404,
      message: 'Resource not found',
      errorCode: 'AssetNotFoundException',
      timestamp: '2024-06-01T12:34:56.789Z',
      apiPath: '/assets',
    },
  },
};
