import UserData from '../data/user.js';
import HashHelper from '../../../utils/hash-pasword.js';
import { generateCode } from '../../../utils/code.js';
import ErrorHelper from '../../../utils/error-helper.js';
import Errors from '../constants/error.js';
import TokenHelper from '../../../utils/token-helper.js';
import TokenData from '../data/token.js';
class UserService {
   static async createUser({ name, surname, email, password, phoneNumber, role }) {
      const user = await UserData.findByPhoneNumber({ phoneNumber });
      if (user) {
         throw new ErrorHelper(Errors.EXISTING_USER)
      }
      const hashedPassword = await HashHelper.hashPassword({ password });
      const code = generateCode();
      //burda logic eklenebilir sms vs
      return UserData.createUser({ name, surname, email, password: hashedPassword, phoneNumber, role, verifyCode: code });
   }
   static async login({ phoneNumber, password }) {
      const user = await UserData.findByPhoneNumber({ phoneNumber });
      if (!user) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND);
      }
      const veriftyPasssword = await HashHelper.verifyPassword({ password, hashedPassword: user.password });
      if (!veriftyPasssword) {
         throw new ErrorHelper(Errors.INVALID_PASSWORD);
      }
      const userToken = await TokenData.findByUserId({ userId: user.id });
      if (userToken && userToken.expiresAt > new Date()) {
         return {
            ...user.dataValues,
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken
         };
      }
      const accessToken = await TokenHelper.generateToken({ payload: { id: user.id, role: user.role }, expiresIn: '1h' });
      const refreshToken = await TokenHelper.generateToken({ payload: { id: user.id, role: user.role }, expiresIn: '7d' });
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await TokenData.updateRefreshToken({ userId: user.id, refreshToken, expiresAt });
      return {
         ...user.dataValues,
         accessToken,
         refreshToken
      };
   }
}
export default UserService;