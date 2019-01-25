class AppException extends Error {
    constructor(code, data) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.status = code;
        this.data = data;
    }
}

export default AppException;
