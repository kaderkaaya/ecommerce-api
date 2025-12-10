import UserModel from '../../../models/panel-user/user.js';
import UserStatus from '../constants/const.js';
class UserData {

  static async createUser({ name, surname, email, password, phoneNumber, role, verifyCode }) {
    const user = await UserModel.create({
      name,
      surname,
      email,
      password,
      phoneNumber,
      role,
      verifyCode,
      verifyPhone: true,
    });
    return user;
  }

  static async findByPhoneNumber({ phoneNumber }) {
    return UserModel.findOne({ where: { phoneNumber } });
  }

  static async findById({ id }) {
    return UserModel.findOne({ where: { id } });
  }

  static async getAllUsers() {
    return UserModel.findAll({ where: { userStatus: UserStatus.USER_STATUS.ACTIVE } });
  }

}
export default UserData;