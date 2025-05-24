import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReelServices } from "./reels.services";

// Add reel (For admin)
const addReel = catchAsync(async (req, res) => {
    const createdBy = req.user.userId;
    console.log(req.body);
  const result = await ReelServices.addReel(req.body, createdBy);

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