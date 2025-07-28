/* eslint-disable no-useless-escape */
import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too short. minimum 2 character must." }).max(50, { message: "Name too long." }),
    email: z.string({ invalid_type_error: "Email must be string." }).email({ message: "Invalid email address format." }),

    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, { message: "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long" }),
    phone: z.string().regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: "Phone number must be valid for Bangladesh." }).optional(),
    address: z.string().max(200, { message: "Address connot exceed 200 characters." }).optional(),
})
export const updateUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too short. minimum 2 character must." }).max(50, { message: "Name too long." }).optional(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, { message: "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long" }).optional(),
    phone: z.string().regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: "Phone number must be valid for Bangladesh." }).optional(),
    address: z.string().max(200, { message: "Address connot exceed 200 characters." }).optional(),
    isDeleted: z.boolean({invalid_type_error:"isDeleted must be true or false."}).optional(),
    isActive: z.enum(Object.values(IsActive) as [string]).optional(),
    isVerified: z.boolean({invalid_type_error:"isVerified must be true or false."}).optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
})