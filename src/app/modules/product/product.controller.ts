import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

// Add Product
const addProduct = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await ProductServices.addProduct(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added successfully",
    data: result,
  });
});

// Get all Products
const getAllProducts = catchAsync(async (req, res) => {
  const {
    keyword,
    category,
    page = "1",
    limit = "10",
  } = req.query;

  const result = await ProductServices.getAllProducts(
    keyword as string,
    category as string,
    Number(page),
    Number(limit)
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: {
      products: result.data,
      pagination: result.meta,
    },
  });
});

// Get single Product by id
const getSingleProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductById(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully.",
    data: result,
  });
});

// Update Product
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProduct(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Update Product
const updateProductClick = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductClick(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete Product
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  updateProductClick,
  deleteProduct,
};
