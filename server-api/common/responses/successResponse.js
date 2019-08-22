import BaseResponse from './baseResponse';

class SuccessResponse extends BaseResponse {
    constructor(data) {
        super(true);
        if (data) {
            this.data = data;
        }
    }
}

export default SuccessResponse;
