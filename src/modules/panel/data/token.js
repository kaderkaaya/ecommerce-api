import TokenModel from '../../../models/panel-user/token.js';
class TokenData {

    static async updateRefreshToken({ userId, refreshToken: token, expiresAt }) {
        await TokenModel.create({
            userId,
            token,
            expiresAt
        });
    }

    static async findByUserId({ userId }) {
        return TokenModel.findOne({ where: { userId } });
    };
}
export default TokenData;