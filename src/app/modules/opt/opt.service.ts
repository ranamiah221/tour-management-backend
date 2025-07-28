import crypto from 'crypto';
import { redisClient } from '../../config/redis.config';
import { sendEmail } from '../../utils/sendEmail';
import AppError from '../../errorHelper/AppError';
import { User } from '../user/user.model';

const OTP_EXPIRATION = 2 * 60;

const generateOpt = (length = 6) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length)
    return otp;
}

const sendOTP = async (email: string, name: string) => {
     const user = await User.findOne({ email })
    if (!user) {
        throw new AppError(404, "User is not found")
    }
    if (user.isVerified) {
        throw new AppError(401, "You are already verified.")
    }
    const otp = generateOpt();
    const redisKey = `otp:${email}`

    await redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    })

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name: name,
            otp: otp
        }
    })


};

const verifyOTP = async (email: string, otp: string) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError(404, "User is not found")
    }
    if (user.isVerified) {
        throw new AppError(401, "You are already verified.")
    }

    const redisKey = `otp:${email}`
    const savedOtp = await redisClient.get(redisKey)
    if (!savedOtp) {
        throw new AppError(401, "Invalid OTP");
    }

    if (savedOtp !== otp) {
        throw new AppError(401, "Invalid OTP");
    }

    Promise.all([
        await User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])
};

export const OTPService = {
    sendOTP,
    verifyOTP
}