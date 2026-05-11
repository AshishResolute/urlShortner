import { customErrorClass } from "../ErrorHandler/errorClass.js";
import jwt from "jsonwebtoken";

export let authenticate = (req, res, next) => {
    try {
        let auth = req.headers.authorization;
        if (!auth)
            return next(
                new customErrorClass(`UnAuthorized`, 401, `No Token recieved`),
            );

        const token = auth.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_ACCESS_KEY);

        if (!decode)
            return next(
                new customErrorClass(`Token Expired`, 401, `Invalid Token recieved`),
            );

        req.user = decode;
        next();
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};
