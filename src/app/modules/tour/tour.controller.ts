import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendRespone } from "../../utils/sendResponse";
import { ITour } from "./tour.interface";

const createTour = catchAsync(async (req: Request, res: Response) => {
     const payload:ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[])?.map(file=> file.path)
     }
    const result = await TourService.createTour(payload);
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TourService.getAllTours(query as Record<string, string>);
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: 'Tour retrive successfully',
        data: result.data,
        meta:result.meta
    });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
     const payload:ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[])?.map(file=> file.path)
     }
    const result = await TourService.updateTour(id, payload);
    sendRespone(res, {
        statusCode: 200,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});
const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    sendRespone(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});


// tour type..
const createTourType = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.createTourType(req.body);
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type created successfully',
        data: result,
    });
});
const getAllTourType = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.getAllTourType();
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type retrive successfully',
        data: result,
    });
});
const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
   
    const result = await TourService.updateTourType(id, req.body);
    sendRespone(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type updated successfully',
        data: result,
    });
});
const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTourType(id);
    sendRespone(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type deleted successfully',
        data: result,
    });
});


export const TourController={
    createTour,
    getAllTours,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType,
}