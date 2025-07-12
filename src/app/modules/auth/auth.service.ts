import AppError from "../../errorHelper/AppError";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExits = await User.findOne({ email })
    if (!isUserExits) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exits.")
    }
    const isPasswordMatch = await bcrypt.compare(password as string, isUserExits.password as string)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExits,
        email: isUserExits.email,
        role: isUserExits.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN,envVars.JWT_ACCESS_EXPIRES)
    return {
        accessToken
    }

}

export const AuthServices = {
    credentialsLogin
} 
