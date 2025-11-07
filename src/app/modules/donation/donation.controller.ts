import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DonationService } from "./donation.services";

// Create a donation
const donate = catchAsync(async (req, res) => {
  const result = await DonationService.donate(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Donation made successfully",
    data: result,
  });
});

// Get all donations
const getAllDonations = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const result = await DonationService.getAllDonations(keyword as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All donations fetched successfully",
    data: result,
  });
});

// Get single donation by ID
const getSingleDonation = catchAsync(async (req, res) => {
  const { donationId } = req.params;
  const result = await DonationService.getSingleDonation(donationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation fetched successfully",
    data: result,
  });
});

// Delete donation
const deleteDonation = catchAsync(async (req, res) => {
  const { donationId } = req.params;
  const result = await DonationService.deleteDonation(donationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation deleted successfully",
    data: result,
  });
});

export const DonationController = {
  donate,
  getAllDonations,
  getSingleDonation,
  deleteDonation,
};
