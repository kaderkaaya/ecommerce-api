import RoleModel from '../../../models/panel-user/role.js';
import RoleStatus from '../constants/const.js';
class RoleData {

    static async createRole({ token, name, description, color, authEndpoints }) {
        const role = await RoleModel.create({
            name,
            description,
            color,
            authEndpoints
        });
        return role;
    }

    static async updateRole({ token, roleId, name, description, color, authEndpoints }) {
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (color !== undefined) updateData.color = color;
        if (authEndpoints !== undefined) updateData.authEndpoints = authEndpoints;

        const role = await RoleModel.findByIdAndUpdate(roleId, updateData, { new: true });
        return role;

    }

    static async deleteRole({ token, roleId }) {
        const role = await RoleModel.findByIdAndUpdate({
            id: roleId
        }, {
            roleStatus: RoleStatus.ROLE_STATUS.INACTIVE
        });
        return role;
    }

    static async getRoles({ page, limit }) {
        const skip = (page - 1) * limit;
        const roles = await RoleModel.findAll({ where: { roleStatus: RoleStatus.ROLE_STATUS.ACTIVE } })
        return roles;

    }

    static async getRoleById({ roleId }) {
        const role = await RoleModel.findOne({ where: { id: roleId, roleStatus: RoleStatus.ROLE_STATUS.ACTIVE } });
        return role;
    }
}

export default RoleData;