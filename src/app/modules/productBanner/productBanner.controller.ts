import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductBannerServices } from "./productBanner.services";

// Add Product Banner
const addProductBanner = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await ProductBannerServices.addProductBanner(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product banner created successfully",
    data: result,
  });
});

// Get all Product Banners
const getAllProductBanners = catchAsync(async (req, res) => {

  const result = await ProductBannerServices.getAllProductBanners();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product banners fetched successfully",
    data: result,
  });
});

// Get single Product Banner by ID
const getSingleProductBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;

  const result = await ProductBannerServices.getSingleProductBanner(bannerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product banner fetched successfully",
    data: result,
  });
});

// Update Product Banner
const updateProductBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;
  const file = req.file;

  const result = await ProductBannerServices.updateProductBanner(
    bannerId,
    req.body,
    file
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product banner updated successfully",
    data: result,
  });
});

// Delete Product Banner
const deleteProductBanner = catchAsync(async (req, res) => {
  const { bannerId } = req.params;

  const result = await ProductBannerServices.deleteProductBanner(bannerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product banner deleted successfully",
    data: result,
  });
});

export const ProductBannerControllers = {
  addProductBanner,
  getAllProductBanners,
  getSingleProductBanner,
  updateProductBanner,
  deleteProductBanner,
};
