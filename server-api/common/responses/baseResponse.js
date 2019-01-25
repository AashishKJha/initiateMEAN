'strict';

class BaseResponse {
    constructor(success) {
        this.success = success;
        this.timestamp = Date.now().toLocaleString();
    }
}

export default BaseResponse;
