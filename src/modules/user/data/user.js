import UserModel from '../../../models/user/user.js';
import UserStatus from '../constant/const.js';
class UserData {

  static async createUser({ name, surname, email, password, phoneNumber, verifyCode }) {
    const user = await UserModel.create({
      name,
      surname,
      email,
      password,
      phoneNumber,
      verifyCode,
      verifyPhone: true,
    });
    return user;
  }

  static async findByPhoneNumber({ phoneNumber }) {
    const user = await UserModel.findOne({ where: { phoneNumber } });
    return user;
  }

  static async findById({ id }) {
    return await UserModel.findOne({ where: { id } });
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

  static async deleteAccount({ userId }) {
    await UserModel.update(
      { userStatus: UserStatus.USER_STATUS.INACTIVE },
      { where: { id: userId } }
    );
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }

}
export default UserData;