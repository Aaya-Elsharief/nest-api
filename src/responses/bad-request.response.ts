import { ErrorCodes } from 'src/constants/error-codes';

export class BadRequestResponse {
  constructor(response?) {
    let errorInvalid;
    if (!response || !response.code || response.code === 'INVALID_PARAMS') {
      errorInvalid = ErrorCodes.INVALID_PARAMS;
      errorInvalid.fields = response;
    } else {
      errorInvalid = ErrorCodes[response.code];
    }
    return errorInvalid;
  }
}
