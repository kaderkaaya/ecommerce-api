import UserRouter from '../src/modules/panel/routes/user.js';
export default function (app) {
    app.use('/user', UserRouter);
}