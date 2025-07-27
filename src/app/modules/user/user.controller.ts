/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendRespone } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload:IUser={
        ...req.body,
        picture: req.file?.path
    }
    const user = await userServices.createUser(payload)

    sendRespone(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"User Created Successfully",
        data: user,
    })
    
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string,envVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken= req.user;
     const payload:IUser={
        ...req.body,
        picture: req.file?.path
    }
    // const payload = req.body;
    const user = await userServices.updateUser(userId,payload,verifiedToken as JwtPayload)

    sendRespone(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"User updated Successfully",
        data: user,
    })
    
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers()

    sendRespone(res,{
        statusCode: httpStatus.CREATED,
        success:true,
        message: "User Retrive Successfully",
        data:result.data,
        meta: result.meta,
       
    })
    
})

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await userServices.getMe(decodedToken.userId)

    sendRespone(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Your Profile Retrive Successfully",
        data:result.data,
       
    })
    
})


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
}