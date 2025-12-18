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
            title: "Product",
            version: "1.0.0",
            description: "Product API documentation",
        },
        servers: [
            {
                url: "http://localhost:3002",
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

                CreateCategory: {
                    type: 'object',
                    required: ['name', 'description', 'isActice', 'slug'],
                    properties: {
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        isActive: {
                            type: 'boolean',
                        },
                        slug: {
                            type: 'string',
                        },
                        parentId: {
                            type: 'number',
                        },
                    }
                },
                UpdateCategory: {
                    type: 'object',
                    required: ['categoryId'],
                    properties: {
                        categoryId: {
                            type: 'number',
                        },
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        isActice: {
                            type: 'string',
                        },
                        slug: {
                            type: 'string',
                        },
                        parentId: {
                            type: 'number',
                        },

                    }
                },
                DeleteCategory: {
                    type: 'object',
                    required: ['categoryId'],
                    properties: {
                        categoryId: {
                            type: 'number',
                        }
                    },
                },
                GetCategory: {
                    type: 'object',
                    required: ['categoryId'],
                    properties: {
                        categoryId: {
                            type: 'number'
                        },
                    }
                },
                GetCategories: {
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
