import UserRouter from '../src/modules/panel/routes/user.js';
import RoleRouter from '../src/modules/panel/routes/role.js';

export default function (app) {
    app.use('/user', UserRouter);
    app.use('/role', RoleRouter);
}