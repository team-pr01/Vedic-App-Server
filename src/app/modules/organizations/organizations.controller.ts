import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrganizationServices } from "./organizations.services";

// Add Organization
const addOrganization = catchAsync(async (req, res) => {
  const result = await OrganizationServices.addOrganization(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organization added successfully",
    data: result,
  });
});

// Get All
const getAllOrganizations = catchAsync(async (req, res) => {
  const result = await OrganizationServices.getAllOrganizations();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organizations fetched successfully.",
    data: result,
  });
});

// Get Single
const getSingleOrganizationById = catchAsync(async (req, res) => {
  const { orgId } = req.params;
  const result = await OrganizationServices.getSingleOrganizationById(orgId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organization fetched successfully.",
    data: result,
  });
});

// Update
const updateOrganization = catchAsync(async (req, res) => {
  const { orgId } = req.params;
  const result = await OrganizationServices.updateOrganization(orgId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organization updated successfully.",
    data: result,
  });
});

// Delete
const deleteOrganization = catchAsync(async (req, res) => {
  const { orgId } = req.params;
  const result = await OrganizationServices.deleteOrganization(orgId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Organization deleted successfully.",
    data: result,
  });
});

export const OrganizationControllers = {
  addOrganization,
  getAllOrganizations,
  getSingleOrganizationById,
  updateOrganization,
  deleteOrganization,
};
