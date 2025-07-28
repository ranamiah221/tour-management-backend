import { Request, Response } from "express";
import { sendRespone } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const booking = await BookingService.createBooking(req.body, decodedToken.userId);
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});
const getAllBookings = catchAsync(async (req: Request, res: Response) => {

    const booking = await BookingService.getAllBookings();
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});
const getUserBookings = catchAsync(async (req: Request, res: Response) => {

    const booking = await BookingService.getUserBookings();
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {

    const booking = await BookingService.getSingleBooking();
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
    const booking = await BookingService.updateBookingStatus();
    sendRespone(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});
export const BookingController = {
    createBooking,
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    updateBookingStatus
}