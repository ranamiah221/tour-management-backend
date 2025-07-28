"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { picture: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const user = yield user_service_1.userServices.createUser(payload);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "User Created Successfully",
        data: user,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string,envVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken = req.user;
    const payload = Object.assign(Object.assign({}, req.body), { picture: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    // const payload = req.body;
    const user = yield user_service_1.userServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "User updated Successfully",
        data: user,
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsers();
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "User Retrive Successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_service_1.userServices.getMe(decodedToken.userId);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Your Profile Retrive Successfully",
        data: result.data,
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
};
