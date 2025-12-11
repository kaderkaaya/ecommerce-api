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

  static async getAllUsers({ page, limit }) {
    const skip = Number((page - 1) * limit);
    const numLimint = Number(limit);
    return UserModel.findAll({
      where: { userStatus: UserStatus.USER_STATUS.ACTIVE },
      skip,
      limit: numLimint
    });
  }

  static async updateUser({ userId, name, surname, email, phoneNumber }) {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (surname !== undefined) updateData.surname = surname;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    await UserModel.update(
      updateData,
      { where: { id: userId } });
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }

  static async updatePassword({ userId, password }) {
    await UserModel.update(
      password,
      { where: { id: userId } }
    );
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }

  static async deleteUser({ userId }) {
    await UserModel.update(
      { userStatus: UserStatus.USER_STATUS.INACTIVE },
      { where: { id: userId } }
    );
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }

}
export default UserData;