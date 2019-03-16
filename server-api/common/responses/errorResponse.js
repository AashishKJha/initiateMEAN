import BaseResponse from './baseResponse';

class ErrorResponse extends BaseResponse {
    constructor(success, errorMessage) {
        super(success);
        this.errorMessage = errorMessage;
    }
}

export default ErrorResponse;
