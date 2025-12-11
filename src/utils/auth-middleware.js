import jwt from "jsonwebtoken";
import ResponseHandler from "./response-handler.js";
import Errors from '../../src/modules/panel/constants/error.js';
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.token = decoded;
        next();
    } catch (e) {
        return ResponseHandler.sendError(res, Errors.TOKEN_ERROR.message, Errors.TOKEN_ERROR.statusCode);
    }
};


export default authenticate;