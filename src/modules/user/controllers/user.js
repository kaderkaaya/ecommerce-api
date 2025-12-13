import UserService from '../services/user.js';
import ResponseHelper from '../../../utils/response-handler.js';
import Messages from '../constant/messages.js';

class UserController {
  static async createUser(req, res) {
    try {
      const { name, surname, email, password, phoneNumber } = req.body;
      const user = await UserService.createUser({ name, surname, email, password, phoneNumber });
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


  static async updateUser(req, res) {
    try {
      const userId = req.user.id;  
      const { name, surname, email, phoneNumber } = req.body;
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

  static async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserService.deleteAccount({ userId });
      return ResponseHelper.success({ res, statusCode: 200, message: Messages.USER_ACCOUNT_DELETED_SUCCESS, data: { user } });
    } catch (error) {
      return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
    }
  }

}

export default UserController;