import { ErrorCodes } from 'src/constants/error-codes';

export class InternalServerErrorResponse {
  constructor(response?) {
    return {
      code: response?.code || ErrorCodes['UNEXPECTED_ERROR'].code,
      message: response?.message || ErrorCodes['UNEXPECTED_ERROR'].message,
    };
  }
}
