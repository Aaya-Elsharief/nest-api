export class InternalServerErrorResponse {
  constructor(response) {
    // console.log('response: ', response);
    return {
      code: response.code,
      message: response.message,
    };
  }
}
