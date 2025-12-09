import UserModel from '../../../models/user/user.js';
class UserData {
  static async createUser({ name, surname, email, password, phoneNumber, role}){
    const user =  await UserModel.create({name, surname, email, password, phoneNumber, role});
    return user;
  }
}
export default UserData;