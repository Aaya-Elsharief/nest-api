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
@ValidatorConstraint({ name: 'IsMatchPassword', async: true })
export class PasswordMatchValidation implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [toMatchWith] = args.constraints;
    return args.object[toMatchWith] === value;
  }

  defaultMessage(): string {
    return 'Password is not match';
  }
}

export function IsMatchPassword(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: PasswordMatchValidation,
    });
  };
}
