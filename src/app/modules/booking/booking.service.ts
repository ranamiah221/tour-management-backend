/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelper/AppError";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface"
import httpStatus from 'http-status-codes';
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}
const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();
    const session = await Booking.startSession();
    session.startTransaction();


    try {
        const user = await User.findById(userId)
        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please update your profile to Book a Tour.")
        }
        const tour = await Tour.findById(payload.tour).select("costFrom")
        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_GATEWAY, "No Tour Cost Found!")
        }
        const amount = Number(payload.guestCount) * Number(tour.costFrom)
        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PANDING,
            ...payload
        }], { session })
        const payment = await Payment.create([{
            booking: booking[0]._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount,
        }], { session })
        const updatedBooking = await Booking
            .findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session },
            ).populate("user", "name email phone address")
            .populate("tour", "title costFrom")
            .populate("payment")

        const userAddress = (updatedBooking?.user as any).address;
        const userEmail = (updatedBooking?.user as any).email;
        const userPhone = (updatedBooking?.user as any).phone;
        const userName = (updatedBooking?.user as any).name;
        
        const sslPayload:ISSLCommerz ={
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhone,
            amount: amount,
            name:userName,
            transactionId:transactionId
        }

        const sslPayment = await SSLService.sslPaymentInit(sslPayload)
        await session.commitTransaction();
        session.endSession()
        return {
           paymentUrl:sslPayment.GatewayPageURL,
           booking:updatedBooking,
        }
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
}
const getAllBookings = async () => {

    return {}
}

const getUserBookings = async () => {

    return {}
}
const getSingleBooking = async () => {

    return {}
}
const updateBookingStatus = async () => {

    return {}
}

export const BookingService = {
    createBooking,
    getAllBookings,
    getUserBookings,
    getSingleBooking,
    updateBookingStatus
}