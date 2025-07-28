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
exports.generatePdf = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const pdfkit_1 = __importDefault(require("pdfkit"));
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const generatePdf = (invoiceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ size: "A4", margin: 50 });
            const buffer = [];
            doc.on("data", (chunk) => buffer.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffer)));
            doc.on("error", (err) => reject(err));
            //PDF Content
            doc.fontSize(22)
                .fillColor('#333366')
                .text("INVOICE", { align: "center", underline: true });
            doc.moveDown();
            doc.fontSize(14).fillColor('#000')
                .text(`Transaction ID: `, { continued: true })
                .font('Helvetica-Bold').text(`${invoiceData.transactionId}`);
            doc.font('Helvetica').text(`Booking Date: `, { continued: true })
                .font('Helvetica-Bold').text(`${invoiceData.bookingDate}`);
            doc.font('Helvetica').text(`Customer: `, { continued: true })
                .font('Helvetica-Bold').text(`${invoiceData.userName}`);
            doc.moveDown();
            doc.font('Helvetica').text(`Tour: `, { continued: true })
                .font('Helvetica-Bold').text(`${invoiceData.tourTitle}`);
            doc.font('Helvetica').text(`Guests: `, { continued: true })
                .font('Helvetica-Bold').text(`${invoiceData.guestCount}`);
            doc.font('Helvetica').text(`Total Amount: `, { continued: true })
                .font('Helvetica-Bold').fillColor('#009688')
                .text(`$${invoiceData.totalAmount.toFixed(2)}`);
            doc.moveDown();
            // Add horizontal line
            doc.moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor('#cccccc')
                .lineWidth(1)
                .stroke();
            doc.moveDown(2);
            doc.fontSize(14)
                .fillColor('#444')
                .text("Thank you for booking with us!", {
                align: "center",
            });
            doc.end();
        });
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.default(401, `Pdf creation error ${error.message}`);
    }
});
exports.generatePdf = generatePdf;
