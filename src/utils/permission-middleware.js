import RoleData from "../modules/panel/data/role.js";
import ErrorHelper from './error-helper.js';
import Errors from '../modules/panel/constants/error.js';

export default function permissionMiddleware({ endpointName }) {
    return async (req, res, next) => {
        try {
            const role = req.token.role;
            const userRoleDetails = await RoleData.getRoleById({ roleId: role });
            if (!userRoleDetails) {
                throw new ErrorHelper(Errors.FORBIDDEN.message, Errors.FORBIDDEN.statusCode);
            }
            const permissionMiddlewares = userRoleDetails.authEndpoints;

            if (!permissionMiddlewares.includes(endpointName)) {
                throw new ErrorHelper(Errors.FORBIDDEN.message, Errors.FORBIDDEN.statusCode);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}
