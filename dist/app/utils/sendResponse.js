"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRespone = void 0;
const sendRespone = (res, data) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });
};
exports.sendRespone = sendRespone;
