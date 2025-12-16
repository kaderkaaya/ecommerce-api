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
                CreateUser: {
                    type: 'object',
                    required: ['email', 'password', 'name', 'surname', 'role', 'phoneNumber'],
                    properties: {
                        email: {
                            type: 'string',
                            required: true
                        },
                        password: {
                            type: 'string',
                            required: true
                        },
                        name: {
                            type: 'string',
                        },
                        surname: {
                            type: 'string',
                        },
                        role: {
                            type: 'number',
                            required: true
                        },
                        phoneNumber: {
                            type: 'string',
                            required: true
                        },

                    }
                },
                Login: {
                    type: 'object',
                    required: ['phoneNumber', 'password'],
                    properties: {
                        phoneNumber: {
                            type: 'string',
                            required: true
                        },
                        password: {
                            type: 'string',
                            required: true
                        },
                    }
                },
                UpdateUser: {
                    type: 'object',
                    required: ['email', 'password', 'name', 'surname', 'phoneNumber'],
                    properties: {
                        email: {
                            type: 'string',
                            required: true
                        },
                        name: {
                            type: 'string',
                        },
                        surname: {
                            type: 'string',
                        },
                        phoneNumber: {
                            type: 'string',
                            required: true
                        },

                    }
                },
                UpdatePassword: {
                    type: 'object',
                    required: ['oldPassword', 'newPassword'],
                    properties: {
                        oldPassword: {
                            type: 'string',
                            required: true
                        },
                        newPassword: {
                            type: 'string',
                            required: true
                        },

                    }
                },
                DeleteUser: {
                    type: 'object',
                    required: ['userid'],
                    properties: {
                        userid: {
                            type: 'number',
                            required: true
                        }
                    },
                },
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
