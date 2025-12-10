class SchemaHelper {
    static validateSchemaBody(schema) {
        return async (req, res, next) => {
            try {
                const validate = await schema.validateAsync(req.body);
                req.body = validate;
                next();
            } catch (error) {
                res.status(400).json({ errors: error.details });
            }
        }
    }

    static validateSchemaQuery(schema) {
        return async (req, res, next) => {
            try {
                const validate = await schema.validateAsync(req.query);
                req.query = validate;
                next();
            } catch (error) {
                res.status(400).json({ errors: error.details });
            }
        };
    }

}
export default SchemaHelper; 