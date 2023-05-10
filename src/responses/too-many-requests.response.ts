import { ErrorCodes } from 'src/constants/error-codes';

export class TooManyRequestsResponse {
  constructor() {
    return ErrorCodes.TOO_MANY_REQUESTS;
  }
}
