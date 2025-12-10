import bcrypt from 'bcrypt';
const saltRounds = 10;

class HashHelper {
    static async hashPassword({ password }) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    static async verifyPassword({ password, hashedPassword }) {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}

export default HashHelper;