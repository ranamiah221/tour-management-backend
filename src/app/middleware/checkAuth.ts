import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";
import httpStatus from 'http-status-codes'
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = await req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "Access Token Not Found")
        }
        const verifiedToken = await verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        const isUserExits = await User.findOne({ email: verifiedToken.email })
        if (!isUserExits) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exits.")
        }
        if (isUserExits.isActive === IsActive.BLOCKED || isUserExits.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExits.isActive}`)
        }
        if (isUserExits.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is deleted.")
        }


        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted this route.")
        }

        req.user = verifiedToken;

        next()
    } catch (error) {
        next(error)
    }
}