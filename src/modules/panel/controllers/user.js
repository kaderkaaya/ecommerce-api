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
      const userId = req.user.id;
      const user = await UserService.getUser({ userId });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_FETCH_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async getUsers(req, res) {
    try {
      const userId = req.user.id;
      const { page, limit } = req.query;
      const users = await UserService.getUsers({ userId, page, limit });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_FETCH_SUCCESS, data: { users } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { name, surname, email, phoneNumber } = req.body;
      const userId = req.user.id;
      const user = await UserService.updateUser({ userId, name, surname, email, phoneNumber });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_UPDATE_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      const user = await UserService.updatePassword({ userId, oldPassword, newPassword });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_PASSWORD_UPDATE_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.user.id;
      const { userid } = req.body;
      const user = await UserService.deleteUser({ userId, userid });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_DELETED_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

}

export default UserController;