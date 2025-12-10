import UserData from '../data/user.js';
import hashPassword from '../../../utils/hash-pasword.js';
import { generateCode } from '../../../utils/code.js';
class UserService {
   static async createUser({ name, surname, email, password, phoneNumber, role }) {
      const hashedPassword = await hashPassword({ password });
      const code = generateCode();
      //burda logic eklenebilir sms vs
      return UserData.createUser({ name, surname, email, password: hashedPassword, phoneNumber, role, verifyCode: code });
   }
}
export default UserService;