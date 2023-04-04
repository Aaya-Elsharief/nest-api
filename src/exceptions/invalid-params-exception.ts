import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParamsException extends HttpException {
  constructor(res?: any) {
    super(res || 'Bad Request', HttpStatus.BAD_REQUEST);
  }
}
