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
      console.log('error', error);

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
      const { token, page, limit } = req.query;
      const users = await UserService.getUsers({ token, page, limit });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_FETCH_SUCCESS, data: { users } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { token, name, surname, email, phoneNumber } = req.body;
      const user = await UserService.updateUser({ token, name, surname, email, phoneNumber });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_UPDATE_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { token, oldPassword, newPassword } = req.body;
      const user = await UserService.updatePassword({ token, oldPassword, newPassword });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_PASSWORD_UPDATE_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { token, userId } = req.body;
      const user = await UserService.deleteUser({ token, userId });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_DELETED_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

}

export default UserController;