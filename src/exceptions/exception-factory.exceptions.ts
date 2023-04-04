import { ValidationError } from 'class-validator';
import { ValidationErrorCodes } from 'src/constants/validation-error-codes';

import { InvalidParamsException } from './invalid-params-exception';

export class ErrorRules {
  [key: string]: any;
}

export const ValidationExceptionFactory = (errors: ValidationError[]) => {
  // console.log('errors: ', errors);
  const errorsKeys: ErrorRules = {};

  RecursionErrors(errors, errorsKeys);

  // console.dir(errorsKeys, { depth: null });

  return new InvalidParamsException(errorsKeys);
};

const RecursionErrors = (
  errors: ValidationError[],
  errorsKeys: ErrorRules,
  propName?: string,
) => {
  errors.map((error) => {
    const property =
      propName != undefined && propName.length > 0
        ? propName + '.' + error.property
        : error.property;

    if (!error.children.length) {
      errorsKeys[property] = [];
      Object.keys(error.constraints).map((constrain) => {
        errorsKeys[property].push({
          [constrain]: ValidationErrorCodes[constrain] || null,
        });
      });
    } else {
      RecursionErrors(error.children, errorsKeys, property);
    }
  });
};
