export default {
    Response: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            statusCode: { type: 'number' },
            message: { type: 'string' },
            data: { type: 'object' }
        }
    },
}