import { ErrorCodes } from 'src/constants/error-codes';

export class BadRequestResponse {
  constructor(response?) {
    let errorInvalid;
    if (!response || !response.code || response.code === 'INVALID_PARAMS') {
      errorInvalid = ErrorCodes.INVALID_PARAMS;
      errorInvalid.fields = response;
    } else if (response.code.includes('SIMPLIFI_ERROR')) {
      errorInvalid = ErrorCodes.SIMPLIFI_ERROR;
      errorInvalid.feedBack = response;
    } else {
      errorInvalid = ErrorCodes[response.code];
    }
    return errorInvalid;
  }
}
