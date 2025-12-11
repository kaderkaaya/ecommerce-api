import UserService from '../services/user.js';
import ResponseHelper from '../../../utils/response-handler.js';
import Messages from '../constants/messages.js';

class UserController {
  static async createUser(req, res) {
    try {
      const { name, surname, email, password, phoneNumber, role } = req.body;
      const user = await UserService.createUser({ name, surname, email, password, phoneNumber, role });
      return ResponseHelper.success({ res, statusCode: 201, message: Messages.USER_CREATED_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;
      const user = await UserService.login({ phoneNumber, password });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_LOGIN_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const { token } = req.query;
      const user = await UserService.getUser({ token });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_FETCH_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async getUsers(req, res) {
    try {
      const { token } = req.query;
      const users = await UserService.getUsers({ token });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_FETCH_SUCCESS, data: { users } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

}

export default UserController;