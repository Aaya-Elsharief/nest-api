import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongoose/node_modules/mongodb';

interface responseInterface {
  statusCode: number;
  message: string;
}

@Catch(MongoError)
export class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorRes = this.filterException(exception);

    response.status(errorRes.statusCode).json({
      statusCode: errorRes.statusCode,
      message: errorRes.message,
    });
  }

  private filterException(exception: any): responseInterface {
    if (exception.name === 'MongoServerError') {
      switch (exception.code) {
        case 11000:
          return { statusCode: 400, message: 'Duplicate Key Error' };
        case 121:
          return { statusCode: 400, message: 'Document Validation Error' };
        default:
          return { statusCode: 500, message: 'Mongo error' };
      }
    } else {
      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }
}
