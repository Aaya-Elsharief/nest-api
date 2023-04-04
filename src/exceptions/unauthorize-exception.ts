import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(res?: any) {
    super(res || 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
