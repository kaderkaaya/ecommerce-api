import RoleService from '../services/role.js';
import ErrorHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class RoleController {
    static async createRole(req, res) {
        try {
            const { token, name, description, color, authEndpoints } = req.body;
            const role = await RoleService.createRole({ token, name, description, color, authEndpoints });
            return ErrorHelper.success({ res, statusCode: 201, message: Messages.ROLE_CREATED_SUCCESS, data: { role } });
        } catch (error) {
            return ErrorHelper.sendError({ res, statusCode: 500, message: error.message });
        }

    }

    static async updateRole(req, res) {
        try {
            const { token, roleId, name, description, color, authEndpoints } = req.body;
            const role = await RoleService.updateRole({ token, roleId, name, description, color, authEndpoints });
            return ErrorHelper.success({ res, statusCode: 201, message: Messages.ROLE_UPDATED_SUCCESS, data: { role } });
        } catch (error) {
            return ErrorHelper.sendError({ res, statusCode: 500, message: error.message });
        }

    }

    static async deleteRole(req, res) {
        // Implementation for deleting a role
    }

    static async getRoles(req, res) {
        // Implementation for retrieving roles
    }
}

export default RoleController;