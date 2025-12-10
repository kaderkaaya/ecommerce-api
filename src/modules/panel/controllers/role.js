import RoleService from '../services/role.js';
import ErrorHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class RoleController {
    static async createRole(req, res) {
        const { token, name, description, color, authEndpoints } = req.body;
        const role = await RoleService.createRole({ token, name, description, color, authEndpoints });
        return ErrorHelper.success({ res, statusCode: 201, message: Messages.ROLE_CREATED_SUCCESS, data: { role } });
    }

    static async updateRole(req, res) {
        // Implementation for updating a role
    }

    static async deleteRole(req, res) {
        // Implementation for deleting a role
    }

    static async getRoles(req, res) {
        // Implementation for retrieving roles
    }
}

export default RoleController;