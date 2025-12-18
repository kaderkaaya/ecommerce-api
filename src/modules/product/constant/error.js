
export default {
    EXISTING_USER: {
        statusCode: 601,
        message: 'This user already exists'
    },
    PASSWORD_ERROR: {
        statusCode: 602,
        message: `The password must meet the following requirements:
                         - At least 1 lowercase letter
                         - At least 1 uppercase letter
                         - At least 1 number
                         - At least 1 special character (@.#$!%*?&)
                         - At least 8 characters long`
    },
    EMAIL_ERROR: {
        statusCode: 603,
        message: 'Your email address is invalid'
    },
    PASS_ERROR: {
        statusCode: 604,
        message: 'Your password  is wrong'
    },
    USER_ERROR: {
        statusCode: 605,
        message: 'User not found'
    },
    TOKEN_ERROR: {
        statusCode: 606,
        message: 'Token Error'
    },
    PHONE_ALREADY_EXISTS: {
        statusCode: 614,
        message: 'Phone number already in use'
    },
    USER_NOT_FOUND: {
        statusCode: 613,
        message: 'User not found'
    },
    INVALID_PASSWORD: {
        statusCode: 612,
        message: 'Invalid password'
    },
    INVALID_TOKEN: {
        statusCode: 611,
        message: 'Invalid token'
    },
    UNAUTHORIZED: {
        statusCode: 610,
        message: 'Unauthorized access'
    },
    FORBIDDEN: {
        statusCode: 609,
        message: 'Forbidden access'
    },
    CATEGORY_ERROR: {
        statusCode: 610,
        message: 'Category not found'
    },
    PRODUCT_ERROR: {
        statusCode: 611,
        message: 'Product not found'
    }
}