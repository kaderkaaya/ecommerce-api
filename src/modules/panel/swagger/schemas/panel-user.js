export default {
    CreateUser: {
        type: 'object',
        required: ['email', 'password', 'role', 'phoneNumber'],
        properties: {
            email: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            surname: {
                type: 'string',
            },
            role: {
                type: 'number',
            },
            phoneNumber: {
                type: 'string',
            },

        }
    },
    Login: {
        type: 'object',
        required: ['phoneNumber', 'password'],
        properties: {
            phoneNumber: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
        }
    },
    UpdateUser: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            surname: {
                type: 'string',
            },
            phoneNumber: {
                type: 'string',
            },

        }
    },
    UpdatePassword: {
        type: 'object',
        required: ['oldPassword', 'newPassword'],
        properties: {
            oldPassword: {
                type: 'string',
            },
            newPassword: {
                type: 'string',
            },

        }
    },
    DeleteUser: {
        type: 'object',
        required: ['userid'],
        properties: {
            userid: {
                type: 'number',
            }
        },
    },
    GetUser: {
        type: 'object',
    },
    GetUsers: {
        type: 'object',
        properties: {
            page: {
                type: 'number'
            },
            limit: {
                type: 'number'
            },
        }
    },

}