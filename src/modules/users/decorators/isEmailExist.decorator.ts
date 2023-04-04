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
@ValidatorConstraint({ name: 'IsExistEmail', async: true })
export class EmailExistValidation implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const { data } = await this.userService.findUser({ email: value }, {});
    return data;
  }

  defaultMessage(): string {
    return 'Email not exist';
  }
}

export function IsExistEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailExistValidation,
    });
  };
}
