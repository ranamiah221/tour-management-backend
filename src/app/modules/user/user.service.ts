import AppError from "../../errorHelper/AppError";
import { IAuthProvider,  IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;
    // const isUserExits = await User.findOne({ email })
    // if (isUserExits) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User all ready exits.")
    // }
    const hashedPassword = await bcrypt.hash(password as string, 10)
    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email as string
    }
    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    })
    return user
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const ifUserExits = await User.findById(userId)
    if (!ifUserExits) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found.")
    }
   
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.")
        }
        if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.")
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized.")
        }
    }
    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND))
    }
    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
    return newUpdatedUser
}

const getAllUsers = async () => {
    const users = await User.find({})
    const totalUser = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: totalUser
        }
    }
}
export const userServices = {
    createUser,
    getAllUsers,
    updateUser
}