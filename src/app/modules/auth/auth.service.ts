/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';

import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
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
    // create a utills function remove dry... 

    // const jwtPayload = {
    //     userId: isUserExits,
    //     email: isUserExits.email,
    //     role: isUserExits.role
    // }
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userTokens = createUserToken(isUserExits)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExits.toObject();
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest

    }

}

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken : newAccessToken
    }

}

const resetPassword = async (oldPassword: string, newPassword:string, decodedToken:JwtPayload)=> {
    const user = await User.findById(decodedToken.userId)
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user?.password as string)
    if(!isOldPasswordMatch){
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match.")
    }
    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
    user!.save()

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
} 
