import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const checkAuth =(...authRoles: string[])=> async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = await req.headers.authorization;
            if (!accessToken) {
                throw new AppError(403, "Access Token Not Found")
            }
            const verifiedToken = await verifyToken(accessToken,envVars.JWT_ACCESS_TOKEN) as JwtPayload
            
            if (!authRoles.includes(verifiedToken.role)) {
                throw new AppError(403, "You are not permitted this route.")
            }

            req.user = verifiedToken;
            
            next()
        } catch (error) {
            next(error)
        }
    }