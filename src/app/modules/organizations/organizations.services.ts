import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TOrganization } from "./organizations.interface";
import Organization from "./organizations.model";

const addOrganization = async (payload: TOrganization) => {
  const result = await Organization.create(payload);
  return result;
};

const getAllOrganizations = async () => {
  return await Organization.find();
};

const getSingleOrganizationById = async (orgId: string) => {
  const result = await Organization.findById(orgId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }
  return result;
};

const updateOrganization = async (orgId: string, payload: Partial<TOrganization>) => {
  const existing = await Organization.findById(orgId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }

  const result = await Organization.findByIdAndUpdate(orgId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrganization = async (orgId: string) => {
  const existing = await Organization.findById(orgId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }

  return await Organization.findByIdAndDelete(orgId);
};

export const OrganizationServices = {
  addOrganization,
  getAllOrganizations,
  getSingleOrganizationById,
  updateOrganization,
  deleteOrganization,
};
