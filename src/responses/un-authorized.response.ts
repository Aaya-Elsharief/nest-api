import { ErrorCodes } from 'src/constants/error-codes';

export class UnauthorizedResponse {
  constructor(response?) {
    if (response)
      return {
        code: response.statusCode || response.code,
        message: response.message,
      };
    else return ErrorCodes.UNAUTHORIZED_ERROR;
  }
}
