import jwt from "jsonwebtoken";
const JWTKEY = process.env.JWT_SECRET;
import ErrorHelper from '../utils/response-handler.js'
import Messages from '../modules/panel/constants/messages.js';

class TokenHelper {

    static async generateToken({ payload, expiresIn }) {
        return jwt.sign(payload, JWTKEY, { expiresIn });
    }
    static async verifyToken({ token }) {
        try {
            const decoded = jwt.verify(token, JWTKEY);
            return decoded;
        } catch (error) {
            return ErrorHelper.sendError({ res: null, statusCode: 401, message: Messages.INVALID_TOKEN });
        }
    }
}
export default TokenHelper;