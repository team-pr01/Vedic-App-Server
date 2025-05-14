import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { EmergencyServices } from './emergency.services';

// Create product
const postEmergency = catchAsync(async (req, res) => {
  // const files = Array.isArray(req.files) ? req.files : [];
  const result = await EmergencyServices.postEmergency(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'We have received your request and will get back to you soon.',
    data: result,
  });
});


// Get all product with filteration
const getAllProducts = catchAsync(async (req, res) => { 
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const category = req.query.category as string;
  const brand = req.query.brand as string;
  const rating = parseFloat(req.query.rating as string);
  const priceRange = req.query.priceRange as string;

  const result = await EmergencyServices.getAllProducts(page, limit, search, category, brand, rating, priceRange);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: {
      metadata: {
        totalProducts: result.totalProducts,
        productsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(result.totalProducts / limit),
      },
      products: result.products,
    },
  });
});


// Get single product by id
const getSingleProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await EmergencyServices.getSingleProductById(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully.',
    data: result,
  });
});


// Delete product by id
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await EmergencyServices.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});


export const EmergencyControllers = {
  postEmergency,
  getAllProducts,
  getSingleProductById,
  deleteProduct,
  // getMyProducts

};
