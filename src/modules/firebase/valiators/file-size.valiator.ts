import { BadRequestException, FileValidator, Injectable } from '@nestjs/common';
import { ValidationErrorCodes } from 'src/constants/validation-error-codes';

export type sth = {
  count: number;
};

@Injectable()
export class FileMimValidator extends FileValidator<sth> {
  isValid(file?: any): boolean | Promise<boolean> {
    // console.log('file: **********************');
    if (!file)
      throw new BadRequestException(ValidationErrorCodes['FileRequired']);
    else return true;
  }
  buildErrorMessage(file: any): string {
    // console.log('file:  this msg');
    throw new BadRequestException(ValidationErrorCodes['FileRequired']);
  }
}
