import RoleData from '../data/role.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import TokenHelper from '../../../utils/token-helper.js';
class RoleService {
    static async createRole({ token, name, description, color, authEndpoints }) {
        const role = await RoleData.createRole({ token, name, description, color, authEndpoints });
        return role;
    }

    static async updateRole({ token, roleId, name, description, color, authEndpoints }) {
        const role = await RoleData.updateRole({ token, roleId, name, description, color, authEndpoints });
        return role;
    }

    static async deleteRole({ token, roleId }) {
        const role = await RoleData.deleteRole({ token, roleId });
        return role;
    }

    static async getRoles({ token, page, limit }) {
        const roles = await RoleData.getRoles({ page, limit });
        return roles;
    }
}

export default RoleService;