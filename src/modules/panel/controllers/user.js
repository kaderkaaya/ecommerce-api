import UserService from '../services/user.js';
import ErrorHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class UserController {
  static async createUser(req, res) {
    try {
      const { name, surname, email, password, phoneNumber, role } = req.body;
      const user = await UserService.createUser({ name, surname, email, password, phoneNumber, role });
      return ErrorHelper.success({ res, statusCode: 201, message: Messages.USER_CREATED_SUCCESS, data: { user } });
    } catch (error) {
      return ErrorHelper.sendError({ res, statusCode: 500, message: error.message });
    }
  }
  static async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;
      const user = await UserService.login({ phoneNumber, password });
      return ErrorHelper.success({ res, statusCode: 200, message: Messages.USER_LOGIN_SUCCESS, data: { user } });
    } catch (error) {
      console.log('error', error);

      return ErrorHelper.sendError({ res, statusCode: 500, message: error.message });
    }
  }
}

export default UserController;