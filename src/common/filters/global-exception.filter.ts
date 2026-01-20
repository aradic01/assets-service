import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message, errorCode } =
      this.extractExceptionDetails(exception);

    this.logger.error(`Handling ${errorCode} : ${message}`);

    const errorResponse: ErrorResponseDto = {
      statusCode: status,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
      apiPath: request.url,
    };

    response.status(status).json(errorResponse);
  }

  extractExceptionDetails(exception: unknown): {
    status: number;
    message: string;
    errorCode: string;
  } {
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as Record<string, unknown>;
      return {
        status: exception.getStatus(),
        message: (res?.message as string) || exception.message,
        errorCode: exception.name,
      };
    }

    if (exception instanceof Error) {
      this.logger.error(`Unhandled exception: ${exception.message}`);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        errorCode: exception.name,
      };
    }
    // fallback
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: String(exception),
      errorCode: 'UNKNOWN_ERROR',
    };
  }
}
