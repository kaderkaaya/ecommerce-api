import RoleService from '../services/role.js';
import ResponseHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class RoleController {
    static async createRole(req, res) {
        try {
            const { token, name, description, color, authEndpoints } = req.body;
            const role = await RoleService.createRole({ token, name, description, color, authEndpoints });
            return ResponseHelper.success({ res, statusCode: 201, message: Messages.ROLE_CREATED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async updateRole(req, res) {
        try {
            const { token, roleId, name, description, color, authEndpoints } = req.body;
            const role = await RoleService.updateRole({ token, roleId, name, description, color, authEndpoints });
            return ResponseHelper.success({ res, statusCode: 201, message: Messages.ROLE_UPDATED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async deleteRole(req, res) {
        try {
            const { token, roleId } = req.body;
            const role = await RoleService.deleteRole({ token, roleId });
            return ResponseHelper.success({ res, statusCode: 200, message: Messages.ROLE_DELETED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async getRoles(req, res) {
        try {
            const { token, page, limit } = req.query;
            const roles = await RoleService.getRoles({ token, page, limit });
            return ResponseHelper.success({ res, statusCode: 200, message: Messages.ROLES_RETRIEVED_SUCCESS, data: { roles } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }
}

export default RoleController;