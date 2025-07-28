import { Router } from "express";
import { OTPController } from "./opt.controller";

const router = Router();

router.post("/send", OTPController.sendOTP);
router.post("/verify", OTPController.verifyOTP);

export const OtpRoutes = router;