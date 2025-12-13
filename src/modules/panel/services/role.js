import RoleData from '../data/role.js';
import Errors from '../constants/error.js';
import ErrorHelper from '../../../utils/error-helper.js';

class RoleService {
    static async createRole({ userId, name, description, color, authEndpoints }) {
        const role = await RoleData.createRole({ userId, name, description, color, authEndpoints });
        return role;
    }

    static async updateRole({ userId, roleId, name, description, color, authEndpoints }) {
        const role = await RoleData.getRoleById({ roleId });
        if (!role) {
            throw new ErrorHelper(Errors.ROLE_ERROR.message, Errors.ROLE_ERROR.statusCode)
        }
        const updatedRole = await RoleData.updateRole({ userId, roleId, name, description, color, authEndpoints });
        return updatedRole;
    }

    static async deleteRole({ userId, roleId }) {
        const role = await RoleData.getRoleById({ roleId });
        if (!role) {
            throw new ErrorHelper(Errors.ROLE_ERROR.message, Errors.ROLE_ERROR.statusCode)
        }
        const deletedRole = await RoleData.deleteRole({ userId, roleId });
        return deletedRole;
    }

    static async getRoles({ page, limit }) {
        const roles = await RoleData.getRoles({ page, limit });
        return roles;
    }
}

export default RoleService;