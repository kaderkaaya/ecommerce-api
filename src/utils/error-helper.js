class ErrorHelper extends Error {
    statusCode;
    message;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
}

export default ErrorHelper;