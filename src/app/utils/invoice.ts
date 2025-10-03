/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelper/AppError";

export interface IInvoiceData {
    transactionId: string;
    bookingDate: Date;
    userName: string;
    tourTitle: string;
    guestCount: number;
    totalAmount: number;
}

export const generatePdf = async (invoiceData: IInvoiceData): Promise<Buffer<ArrayBufferLike>> => {
    try {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: "A4", margin: 50 })
            const buffer: Uint8Array[] = [];

            doc.on("data", (chunk) => buffer.push(chunk))
            doc.on("end", () => resolve(Buffer.concat(buffer)))
            doc.on("error", (err) => reject(err))

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

        })

    } catch (error: any) {
        console.log(error);
        throw new AppError(401, `Pdf creation error ${error.message}`)
    }
}