import { Types } from "mongoose";
export enum BOOKING_STATUS{
        PANDING="PANDING",
        CANCEL="CANCEL",
        COMPLETE="COMPLETE",
        FAILD="FAILD"
}

export interface IBooking{
    user: Types.ObjectId;
    tour:Types.ObjectId;
    payment?: Types.ObjectId;
    guestCount:number;

    status:BOOKING_STATUS;
    createdAt?: Date;
    status:BOOKING_STATUS

}