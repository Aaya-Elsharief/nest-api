import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../../users/user.service';

@Injectable()
@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class UniqueEmailValidation implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const { data } = await this.userService.findUser({ email: value }, {});
    return !data;
  }

  defaultMessage(): string {
    return 'Email already exist';
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidation,
    });
  };
}
