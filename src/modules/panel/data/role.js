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

    static async updateRole({ roleId, name, description, color, authEndpoints }) {
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (color !== undefined) updateData.color = color;
        if (authEndpoints !== undefined) updateData.authEndpoints = authEndpoints;

        await RoleModel.update(
            updateData,
            { where: { id: roleId } });
        const role = await RoleModel.findOne({ where: { id: roleId } });
        return role;
    }

    static async deleteRole({ roleId }) {
        await RoleModel.update({
            where: { id: roleId }
        }
            , {
                roleStatus: RoleStatus.ROLE_STATUS.INACTIVE
            });
        const role = await RoleModel.findOne({ where: { id: roleId } });
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