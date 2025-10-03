"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRoutes = void 0;
const express_1 = require("express");
const opt_controller_1 = require("./opt.controller");
const router = (0, express_1.Router)();
router.post("/send", opt_controller_1.OTPController.sendOTP);
router.post("/verify", opt_controller_1.OTPController.verifyOTP);
exports.OtpRoutes = router;
