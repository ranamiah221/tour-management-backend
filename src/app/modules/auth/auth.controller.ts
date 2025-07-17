/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendRespone } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { setAuthCookies } from "../../utils/setCookies";
import { createUserToken } from "../../utils/userTokens";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {
            // XXXX
            // return new AppError(401, err)
            // throw new AppError(403,err)

            // yes
            // return next(err)
            return next(new AppError(401,err))
        }
        if (!user) {
            return next(new AppError(401, info.message))
        }
        const userTokens = await createUserToken(user)
        const {password:pass, ...rest} = user.toObject();
        setAuthCookies(res, userTokens)

        sendRespone(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User Login Successfully",
            data: {
                accessToken:userTokens.accessToken,
                refreshToken:userTokens.refreshToken,
                user:rest
            },
        })
    })(req, res, next)


    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly:true,
    //     secure: false,
    // })

    //  res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly:true,
    //     secure: false,
    // })


    // setAuthCookies(res,loginInfo)

    // sendRespone(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"User Login Successfully",
    //     data: loginInfo,
    // })

})
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token recieved from cookies.")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)
    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly:true,
    //     secure: false,
    // })
    setAuthCookies(res, tokenInfo)
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })

})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out Successfully",
        data: null,
    })

})
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)

    sendRespone(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed Successfully",
        data: null,
    })

})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? req.query.state as string : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }
    const user = req.user;
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found.")
    }
    const tokenInfo = createUserToken(user)
    setAuthCookies(res, tokenInfo)
    // sendRespone(res,{
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Password Changed Successfully",
    //     data: null,
    // })
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)

})

export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
} 