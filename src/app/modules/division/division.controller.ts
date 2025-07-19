import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { DivisionService } from "./division.service"
import { sendRespone } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDivision =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const division = await DivisionService.createDivision(req.body)

    sendRespone(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Division Created Successfully",
        data: division,
    })
    
})

const getAllDvisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDvisions()

    sendRespone(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Division Get Successfully",
        data: result,
    })
    
})
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug)

    sendRespone(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Division Get Successfully",
        data: result.data,
    })
    
})

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = await DivisionService.updateDivision(id, body)

    sendRespone(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Division updated Successfully",
        data: result,
    })
    
})

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id)
    sendRespone(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Division deleted Successfully",
        data: result,
    })
    
})

export const DivisionController={
    createDivision,
    getAllDvisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
}