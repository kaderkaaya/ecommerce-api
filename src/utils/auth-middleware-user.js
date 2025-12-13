import jwt, { decode } from "jsonwebtoken";
import ResponseHandler from "./response-handler.js";
import Errors from '../../src/modules/panel/constants/error.js';
import UserData from "../modules/user/data/user.js";
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return ResponseHandler.sendError({
                res,
                message: Errors.TOKEN_ERROR.message,
                statusCode: Errors.TOKEN_ERROR.statusCode
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserData.findById({ id: decoded.id });
        
        if (!user) {
            return ResponseHandler.sendError({
                res,
                message: Errors.USER_ERROR.message,
                statusCode: Errors.USER_ERROR.statusCode
            });
        }
        req.user = user;
        next();
    } catch (e) {
        return ResponseHandler.sendError({
            res,
            message: Errors.TOKEN_ERROR.message,
            statusCode: Errors.TOKEN_ERROR.statusCode
        });

    }
};


export default authenticate;