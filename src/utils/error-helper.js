class ErrorHelper extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
}

export default ErrorHelper;