"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
/* eslint-disable no-useless-escape */
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too short. minimum 2 character must." }).max(50, { message: "Name too long." }),
    email: zod_1.default.string({ invalid_type_error: "Email must be string." }).email({ message: "Invalid email address format." }),
    password: zod_1.default.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, { message: "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long" }),
    phone: zod_1.default.string().regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: "Phone number must be valid for Bangladesh." }).optional(),
    address: zod_1.default.string().max(200, { message: "Address connot exceed 200 characters." }).optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too short. minimum 2 character must." }).max(50, { message: "Name too long." }).optional(),
    password: zod_1.default.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, { message: "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long" }).optional(),
    phone: zod_1.default.string().regex(/^(?:\+8801|8801|01)[3-9][0-9]{8}$/, { message: "Phone number must be valid for Bangladesh." }).optional(),
    address: zod_1.default.string().max(200, { message: "Address connot exceed 200 characters." }).optional(),
    isDeleted: zod_1.default.boolean({ invalid_type_error: "isDeleted must be true or false." }).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.IsActive)).optional(),
    isVerified: zod_1.default.boolean({ invalid_type_error: "isVerified must be true or false." }).optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
});
