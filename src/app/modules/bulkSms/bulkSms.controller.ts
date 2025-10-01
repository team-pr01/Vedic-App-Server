import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BulkSmsServices } from "./bulkSms.services";

// Add API Key (for admin)
const sendBulkEmail = catchAsync(async (req, res) => {
  const result = await BulkSmsServices.sendBulkEmail(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Email sent successfully",
    data: result,
  });
});

export const BulkSmsControllers = {
  sendBulkEmail,
};
