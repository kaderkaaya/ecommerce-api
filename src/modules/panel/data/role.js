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
    static async updateRole({token, roleId, name, description, color, authEndpoints}){
        
    }

}

export default RoleData;