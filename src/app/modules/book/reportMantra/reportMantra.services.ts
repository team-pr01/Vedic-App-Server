/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportMantra from "./reportMantra.model";
import { TReportMantra } from "./reportMantra.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";

// Create a new reported mantra
const reportMantra = async (payload: TReportMantra) => {
  const result = await ReportMantra.create(payload);
  return result;
};

// Get all reported mantras
const getAllReportedMantras = async (status: any) => {
  const query: any = {};

  if (status) {
    query.status = status;
  }

  const result = await ReportMantra.find(query).populate(
    "bookId",
    "name type structure"
  );
  return result;
};

// Get a single reported mantra by ID
const getSingleReportedMantra = async (reportId: string) => {
  const result = await ReportMantra.findById(reportId)
    .populate("bookId", "name type structure")
    .populate("textId", "originalText translation");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Reported mantra not found");
  }

  return result;
};

// Update report status (mark as human verified)
const updateReportStatus = async (
  reportId: string,
  payload: Partial<TReportMantra>
) => {
  const existingReport = await ReportMantra.findById(reportId);
  if (!existingReport) {
    throw new AppError(httpStatus.NOT_FOUND, "Reported mantra not found");
  }

  const updatedReport = await ReportMantra.findByIdAndUpdate(
    reportId,
    payload,
    { new: true, runValidators: true }
  );

  return updatedReport;
};

// Delete Reported Mantra
const deleteReportedMantra = async (reportId: string) => {
  const result = await ReportMantra.findByIdAndDelete(reportId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Reported mantra not found");
  }
  return result;
};


export const ReportMantraService = {
  reportMantra,
  getAllReportedMantras,
  getSingleReportedMantra,
  updateReportStatus,
  deleteReportedMantra
};
