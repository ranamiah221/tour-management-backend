import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelper/AppError";
import { TErrorSources } from "../interfaces/error.types";
import { handleDuplicateError } from "../errorHelper/handleDuplicateError";
import { handleCastError } from "../errorHelper/handleCastError";
import { handleZodError } from "../errorHelper/handleZodError";
import { handleValidationError } from "../errorHelper/handleValidationError";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler =async (err: any, req: Request, res: Response, next: NextFunction) => {
    if(envVars.NODE_ENV ==='development'){
        // eslint-disable-next-line no-console
        console.log(err)
    }

    if(req.file){
        await deleteImageFromCloudinary(req.file.path)
    }

   if(req.files && Array.isArray(req.files)&& req.files.length > 0){
    const imageUrl = (req.files as Express.Multer.File[]).map(file => file.path)
    await Promise.all(imageUrl.map(url => deleteImageFromCloudinary(url)))
   }



    let statusCode = 500
    let message = `Something went wrong!!`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorSources: TErrorSources[] = [];

    // mongoose duplicate error.. 
    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;

    }
    // CastError
    else if (err.name == "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as TErrorSources[];
    }
    // Mongoose ValidationError
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[];
        message = simplifiedError.message;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV==="development"? err: null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}