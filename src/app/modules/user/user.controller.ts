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


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

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
    // const verifiedToken = verifyToken(token as string,envVars.JWT_ACCESS_TOKEN) as JwtPayload
    const verifiedToken= req.user;
    const payload = req.body;
    const user = await userServices.updateUser(userId,payload,verifiedToken)

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


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}