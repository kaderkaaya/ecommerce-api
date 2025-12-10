import RoleModel from '../../../models/panel-user/role.js'
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

}

export default RoleData;