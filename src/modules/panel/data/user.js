import UserModel from '../../../models/panel-user/user.js';

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
  };
  static async findByPhoneNumber({ phoneNumber }) {
    return UserModel.findOne({ where: { phoneNumber } });
  }

}
export default UserData;