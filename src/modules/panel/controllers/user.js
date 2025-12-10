import UserService from '../services/user.js';
import ErrorHelper from '../../../utils/response-handler.js';

class UserController {
  static async createUser(req, res) {
    try {
      const { name, surname, email, password, phoneNumber, role } = req.body;
      const user = await UserService.createUser({ name, surname, email, password, phoneNumber, role });
      return ErrorHelper.success({ res, statusCode: 201, message: 'User created successfully', data: { user } });
    } catch (error) {
      return ErrorHelper.sendError({ res, statusCode: 500, message: error.message });
    }
  }
}

export default UserController;