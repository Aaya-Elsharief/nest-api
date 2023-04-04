import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true, name: 'IsUniqueUsername' })
export class uniqueUsernameValidation implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { data } = await this.userService.findUser({ username: value }, {});
    return !data;
  }

  defaultMessage(): string {
    return 'Username already exist';
  }
}

export function IsUniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: uniqueUsernameValidation,
    });
  };
}
