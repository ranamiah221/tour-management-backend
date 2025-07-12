import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendRespone } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body)
    sendRespone(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data: loginInfo,
    })
    
})

export const AuthController={
    credentialsLogin
} 