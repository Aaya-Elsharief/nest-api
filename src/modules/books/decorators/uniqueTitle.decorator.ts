import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { BookService } from '../book.service';

@Injectable()
@ValidatorConstraint({ name: 'IsUniqueTitle', async: true })
export class UniqueTitleValidation implements ValidatorConstraintInterface {
  constructor(private bookService: BookService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { data } = await this.bookService.findByTitle(value);
    return !data;
  }

  defaultMessage(): string {
    return 'Book title already exist';
  }
}

export function IsUniqueTitle(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueTitleValidation,
    });
  };
}
