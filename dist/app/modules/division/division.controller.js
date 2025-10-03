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
exports.DivisionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const division_service_1 = require("./division.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDivision = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign(Object.assign({}, req.body), { thumbnail: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const division = yield division_service_1.DivisionService.createDivision(payload);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Division Created Successfully",
        data: division,
    });
}));
const getAllDvisions = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield division_service_1.DivisionService.getAllDvisions();
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Division Get Successfully",
        data: result,
    });
}));
const getSingleDivision = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const result = yield division_service_1.DivisionService.getSingleDivision(slug);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Division Get Successfully",
        data: result.data,
    });
}));
const updateDivision = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const payload = Object.assign(Object.assign({}, req.body), { thumbnail: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const result = yield division_service_1.DivisionService.updateDivision(id, payload);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Division updated Successfully",
        data: result,
    });
}));
const deleteDivision = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield division_service_1.DivisionService.deleteDivision(req.params.id);
    (0, sendResponse_1.sendRespone)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Division deleted Successfully",
        data: result,
    });
}));
exports.DivisionController = {
    createDivision,
    getAllDvisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
};
