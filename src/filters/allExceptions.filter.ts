import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCodes } from 'src/constants/error-codes';
import { BadRequestResponse } from 'src/responses/bad-request.response';
import { InternalServerErrorResponse } from 'src/responses/internal-server-error.response';
import { TooManyRequestsResponse } from 'src/responses/too-many-requests.response';
import { UnauthorizedResponse } from 'src/responses/un-authorized.response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody = null;

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        if (exception instanceof HttpException) {
          responseBody = new BadRequestResponse(exception.getResponse());
        } else responseBody = new BadRequestResponse();
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        break;

      case HttpStatus.UNAUTHORIZED:
        if (exception instanceof HttpException) {
          responseBody = new UnauthorizedResponse(exception.getResponse());
        } else responseBody = new UnauthorizedResponse();
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        break;

      case HttpStatus.TOO_MANY_REQUESTS:
        responseBody = new TooManyRequestsResponse();
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        break;

      default:
        if (exception instanceof HttpException)
          responseBody = new InternalServerErrorResponse(
            exception.getResponse(),
          );
        else
          responseBody = new InternalServerErrorResponse(
            ErrorCodes.UNEXPECTED_ERROR,
          );
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        break;
    }
  }
}
