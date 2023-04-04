import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(validationErrors: ValidationError[]) {
    super(
      { statusCode: 400, errors: validationErrors },
      HttpStatus.BAD_REQUEST,
    );
  }
}
