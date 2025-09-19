/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Consultation from "./consultations.model";
import { TConsultation } from "./consultations.interface";

// Book a consultation
const bookConsultation = async (payload: TConsultation, userId: string) => {
  const payloadData = {
    ...payload,
    userId,
    status: "pending",
  };

  const result = await Consultation.create(payloadData);
  return result;
};

// Get all consultations (admin)
const getAllConsultations = async (keyword?: string, status?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { expertName: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const result = await Consultation.find(query)
    .populate("userId", "name email phoneNumber")       // populate user
    .populate("consultantId", "name email phoneNumber"); // populate consultant

  return result;
};


// Get single consultation by id
const getSingleConsultationById = async (consultationId: string) => {
  const result = await Consultation.findById(consultationId).populate("userId", "name email phoneNumber").populate("consultantId", "name email phoneNumber");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return result;
};

// Get my consultations (logged-in user)
const getMyConsultations = async (userId: string) => {
  const result = await Consultation.find({ user: userId });
  return result;
};

// Update consultation status (admin)
const updateConsultationStatus = async (consultationId: string, status: string) => {
  const existing = await Consultation.findById(consultationId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }

  const result = await Consultation.findByIdAndUpdate(
    consultationId,
    { status },
    { new: true, runValidators: true }
  );

  return result;
};

// Delete consultation
const deleteConsultation = async (consultationId: string) => {
  const result = await Consultation.findByIdAndDelete(consultationId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return result;
};

export const ConsultationServices = {
  bookConsultation,
  getAllConsultations,
  getSingleConsultationById,
  getMyConsultations,
  updateConsultationStatus,
  deleteConsultation,
};
