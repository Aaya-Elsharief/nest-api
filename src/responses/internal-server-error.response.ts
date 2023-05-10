import { ErrorCodes } from 'src/constants/error-codes';

export class InternalServerErrorResponse {
  constructor(response?) {
    // console.log('response: ', response);
    return {
      code: response?.code || ErrorCodes['UNEXPECTED_ERROR'].code,
      message: response?.message || ErrorCodes['UNEXPECTED_ERROR'].message,
    };
  }
}
