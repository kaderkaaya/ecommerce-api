export default {
    CreateRole: {
        type: 'object',
        required: ['name', 'description', 'color', 'authEndpoints'],
        properties: {
            name: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            color: {
                type: 'string',
            },
            authEndpoints: {
                type: 'array',
                items: {
                    type: 'string',
                    example: '/user/update-password'
                }
            }

        }
    },
    UpdateRole: {
        type: 'object',
        required: ['roleId'],
        properties: {
            roleId: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            color: {
                type: 'string',
            },
            authEndpoints: {
                type: 'array',
                items: {
                    type: 'string',
                    example: '/user/update-password'
                }
            }
        }
    },
    DeleteRole: {
        type: 'object',
        required: ['roleId'],
        properties: {
            roleId: {
                type: 'number',
            },
        }
    },
    GetRoles: {
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