import UserData from '../data/user.js';
import HashHelper from '../../../utils/hash-pasword.js';
import { generateCode } from '../../../utils/code.js';
import ErrorHelper from '../../../utils/error-helper.js';
import Errors from '../constants/error.js';
import TokenHelper from '../../../utils/token-helper.js';
import TokenData from '../data/token.js';

class UserService {
   static async createUser({ name, surname, email, password, phoneNumber, role }) {
      // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      // const isValidPassword = passwordRegex.test(password);
      // if (!isValidPassword) {
      //    throw new ErrorHelper(Errors.PASSWORD_ERROR.message, Errors.PASSWORD_ERROR.statusCode);
      // }
      const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = mailRegex.test(email);
      if (!isValidEmail) {
         throw new ErrorHelper(Errors.EMAIL_ERROR.message, Errors.EMAIL_ERROR.statusCode);
      }
      const user = await UserData.findByPhoneNumber({ phoneNumber });
      if (user) {
         throw new ErrorHelper(Errors.EXISTING_USER.message, Errors.EXISTING_USER.statusCode);
      }
      const hashedPassword = await HashHelper.hashPassword({ password });
      const code = generateCode();
      //burda logic eklenebilir sms vs
      return UserData.createUser({ name, surname, email, password: hashedPassword, phoneNumber, role, verifyCode: code });
   }

   static async login({ phoneNumber, password }) {
      const user = await UserData.findByPhoneNumber({ phoneNumber });
      if (!user) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      const veriftyPasssword = await HashHelper.verifyPassword({ password, hashedPassword: user.password });
      if (!veriftyPasssword) {
         throw new ErrorHelper(Errors.INVALID_PASSWORD.message, Errors.INVALID_PASSWORD.statusCode);
      }
      const userToken = await TokenData.findByUserId({ userId: user.id });
      const accessToken = await TokenHelper.generateToken({ payload: { id: user.id, role: user.role }, expiresIn: '1h' });
      const refreshToken = await TokenHelper.generateToken({ payload: { id: user.id, role: user.role }, expiresIn: '7d' });

      if (userToken && userToken.expiresAt > new Date()) {
         return {
            ...user.dataValues,
            refreshToken: userToken.token,
            accessToken
         };
      }
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await TokenData.updateRefreshToken({ userId: user.id, refreshToken, expiresAt });
      return {
         ...user.dataValues,
         accessToken,
         refreshToken
      };
   }

   static async getUser({ userId }) {
      const user = await UserData.findById({ id: userId });
      if (!user) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      return user;
   }

   static async getUsers({ userId, page, limit }) {
      const user = await UserData.findById({ id: userId });
      if (!user) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      const users = await UserData.getAllUsers({ page, limit });
      return users;
   }

   static async updateUser({ userId, name, surname, email, phoneNumber }) {
      const user = await UserData.updateUser({ userId, name, surname, email, phoneNumber });
      return user;
   }

   static async decodeUser({ userId }) {
      const user = await UserData.findById({ id: userId });
      if (!user) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      return user;
   }

   static async updatePassword({ userId, oldPassword, newPassword }) {
      const uss = await UserData.findById({ id: userId });
      if (!uss) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      const veriftyPasssword = HashHelper.verifyPassword({ password: oldPassword, hashedPassword: uss.password });
      if (!veriftyPasssword) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      const hashedPassword = HashHelper.hashPassword({ password: newPassword })
      const user = await UserData.updatePassword({ userId: uss.id, password: hashedPassword });
      return user;
   }

   static async deleteUser({ userId, userid }) {
      const uss = await UserData.findById({ id: userId });
      if (!uss) {
         throw new ErrorHelper(Errors.USER_NOT_FOUND.message, Errors.USER_NOT_FOUND.statusCode);
      }
      const user = await UserData.deleteUser({ userid });
      return user;
   }
}
export default UserService;