import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Send emergency message by admin
const addReel = catchAsync(async (req, res) => {
  const result = await ReelServices.addReel(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reel added successfully',
    data: result,
  });
});

export const ReelControllers = {
  addReel,
};