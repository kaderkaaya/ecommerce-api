
export default {
    EXISTING_USER: {
        statusCode: 101,
        message: 'This user already exists'
    },
    PASSWORD_ERROR: {
        statusCode: 102,
        message: `The password must meet the following requirements:
                         - At least 1 lowercase letter
                         - At least 1 uppercase letter
                         - At least 1 number
                         - At least 1 special character (@.#$!%*?&)
                         - At least 8 characters long`
    },
    EMAIL_ERROR: {
        statusCode: 103,
        message: 'Your email address is invalid'
    },
    PASS_ERROR: {
        statusCode: 104,
        message: 'Your password  is wrong'
    },
    USER_ERROR: {
        statusCode: 105,
        message: 'User not found'
    },
    TOKEN_ERROR: {
        statusCode: 106,
        message: 'Token Error'
    },
    NOTE_ERROR: {
        statusCode: 107,
        message: 'Note Error'
    },
    PHONE_ALREADY_EXISTS: {
        statusCode: 108,
        message: 'Phone number already in use'
    },
    USER_NOT_FOUND: {
        statusCode: 109,
        message: 'User not found'
    },
    INVALID_PASSWORD: {
        statusCode: 110,
        message: 'Invalid password'
    }
}