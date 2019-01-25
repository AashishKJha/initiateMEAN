import ErrorResponse from '../../common/responses/errorResponse';

class AuthErrorResponse extends ErrorResponse {
  constructor(errorMessage, userNotFound) {
    super(false, errorMessage);
    if (userNotFound) {
      this.userNotFound = userNotFound;
    }
  }
}

export default AuthErrorResponse;
