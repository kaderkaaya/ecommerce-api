import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(' __dirname', __dirname);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Panel-User",
            version: "1.0.0",
            description: "Panel-User API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        security: [
            {
                bearerAuth: []
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Response: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        statusCode: { type: 'number' },
                        message: { type: 'string' },
                        data: { type: 'object' }
                    }
                },

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
                // GetRoles: {
                //     type: 'object',
                //     properties: {
                //         page: {
                //             type: 'number'
                //         },
                //         limit: {
                //             type: 'number'
                //         },
                //     }
                // },
            }

        }
    },


    apis: [
        path.join(
            __dirname,
            '../routes/**/*.js'
        ),
    ],
};

const swagger = swaggerJSDoc(options);
export default swagger;
