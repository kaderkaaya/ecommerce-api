import RoleService from '../services/role.js';
import ResponseHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class RoleController {
    static async createRole(req, res) {
        try {
            const userId = req.user.id;
            const { name, description, color, authEndpoints } = req.body;
            const role = await RoleService.createRole({ userId, name, description, color, authEndpoints });
            return ResponseHelper.success({ res, statusCode: 201, message: Messages.ROLE_CREATED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async updateRole(req, res) {
        try {
            const userId = req.user.id;
            const { roleId, name, description, color, authEndpoints } = req.body;
            const role = await RoleService.updateRole({ userId, roleId, name, description, color, authEndpoints });
            return ResponseHelper.success({ res, statusCode: 201, message: Messages.ROLE_UPDATED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async deleteRole(req, res) {
        try {
            const userId = req.user.id;
            const { roleId } = req.body;
            const role = await RoleService.deleteRole({ userId, roleId });
            return ResponseHelper.success({ res, statusCode: 200, message: Messages.ROLE_DELETED_SUCCESS, data: { role } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async getRoles(req, res) {
        try {
            const userId = req.user.id;
            const { page, limit } = req.query;
            const roles = await RoleService.getRoles({ userId, page, limit });
            return ResponseHelper.success({ res, statusCode: 200, message: Messages.ROLES_RETRIEVED_SUCCESS, data: { roles } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }
}

export default RoleController;