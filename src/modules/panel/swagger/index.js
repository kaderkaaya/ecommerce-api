import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import PanelUserSchema from '../swagger/schemas/panel-user.js';
import RoleSchema from '../swagger/schemas/panel-role.js'
import ResponseSchema from '../swagger/schemas/response.js';
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
                ...PanelUserSchema,
                ...RoleSchema,
                ...ResponseSchema
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
