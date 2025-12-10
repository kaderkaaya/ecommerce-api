import jwt from "jsonwebtoken";
const JWTKEY = process.env.JWT_SECRET;

class TokenHelper {
    static async generateToken({ payload, expiresIn }) {
        return jwt.sign(payload, JWTKEY, { expiresIn });
    }
}
export default TokenHelper;