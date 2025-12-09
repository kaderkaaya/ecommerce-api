import UserData from '../data/user.js';

class UserService {
 static async createUser({ name, surname, email, password, phoneNumber, role }){
    return UserData.createUser({ name, surname, email, password, phoneNumber, role});
 }
}
export default UserService;