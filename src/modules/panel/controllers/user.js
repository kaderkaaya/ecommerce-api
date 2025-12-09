import UserService from '../services/user.js';

class UserController {
  static async createUser(req, res, next) {
    try {
      const { name, surname, email, password, phoneNumber, role } = req.body;
      const user = await UserService.createUser({ name, surname, email, password, phoneNumber, role });
      return res.status(200).json({ 'User': user })
    } catch (error) {

    }
  }
}
export default UserController;