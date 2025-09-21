/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import Donation from "./donation.model";
import { TDonation } from "./donation.interface";
import { User } from "../auth/auth.model";
import DonationPrograms from "../donationPrograms/donationPrograms.model";

const donate = async (
  payload: TDonation,
  file: Express.Multer.File | undefined,
  user: any
) => {
  let imageUrl = "";

  const userData = await User.findById(user.userId);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (file) {
    const imageName = `${payload.userName || "donor"}-${Date.now()}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const donationData = {
    ...payload,
    imageUrl,
    userName: userData.name,
    userPhoneNumber: userData.phoneNumber,
    userEmail: userData.email,
    userId: userData._id,
  };

  const result = await Donation.create(donationData);

  if (payload.donationProgramId && payload.amount) {
    const program = await DonationPrograms.findById(payload.donationProgramId);

    if (!program) {
      throw new AppError(httpStatus.NOT_FOUND, "Donation program not found");
    }

    const currentAmount = Number(program.amountRaised) || 0;
    const newAmount = Number(payload.amount) || 0;

    program.amountRaised = String(currentAmount + newAmount);
    await program.save();
  }

  return result;
};

// Get all donations
const getAllDonations = async (keyword?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { userName: { $regex: keyword, $options: "i" } },
      { userPhoneNumber: { $regex: keyword, $options: "i" } },
      { userEmail: { $regex: keyword, $options: "i" } },
      { donationProgramId: { $regex: keyword, $options: "i" } },
      { donationProgramTitle: { $regex: keyword, $options: "i" } }
    ];
  }

  const result = await Donation.find(query).sort({ createdAt: -1 });
  return result;
};

// Get single donation by ID
const getSingleDonation = async (id: string) => {
  const result = await Donation.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Donation not found");
  }
  return result;
};

// Delete donation
const deleteDonation = async (id: string) => {
  const result = await Donation.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Donation not found");
  }
  return result;
};

export const DonationService = {
  donate,
  getAllDonations,
  getSingleDonation,
  deleteDonation,
};
