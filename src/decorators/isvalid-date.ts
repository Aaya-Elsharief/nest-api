import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
// import { ValidationErrorCodes } from '../../../constants/validation-error-codes';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { ValidationErrorCodes } from '../constants/validation-error-codes';
/**
 * NOTE::Validator Constraint name must be the same as the error message key located at ValidationErrorCodes map
 * Example:
 * In case of the Validator Constraint name = "weakPassword", then you must add key : value like the following at "validation-error-codes.ts"
 * 'weakPassword': {
        en: 'XXXXXXXXXXXX',
        ar: 'مستخدم من قبل مستخدم اخر',
    }
 */
@ValidatorConstraint({ name: 'isValidDate', async: true })
@Injectable()
export class IsValidDateRule implements ValidatorConstraintInterface {
  public validate(value: string) {
    if (!value || value.length < 'YYYY-MM-DD HH:mm:ss'.length) {
      return false;
    }
    const date = moment(value, 'YYYY-MM-DD HH:mm:ss', true);
    console.log('date: ', date);
    if (!date.isValid()) {
      return false;
    }
    return true;
  }
  public defaultMessage(args: ValidationArguments) {
    return JSON.stringify(ValidationErrorCodes['isValidDate']);
  }
}
/**
 * The following register our custom decorator "@WeakPassword" at Nestjs
 * This help with validation & allow us to use it as NORMAL decorator
 * Example: use it like this @WeakPassword() instead of => @Validate(WeakPasswordRule)
 * @param validationOptions
 * @constructor
 */
export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidDateRule,
    });
  };
}
