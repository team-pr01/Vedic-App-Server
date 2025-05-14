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


// Get all emergency posts with search and filter by status
const getAllEmergencyPosts = catchAsync(async (req, res) => {
  const { keyword, status } = req.query;

  const result = await EmergencyServices.getAllEmergencyPosts({
    keyword: keyword as string,
    status: status as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Emergency posts fetched successfully.",
    data: result,
  });
});



// Get single product by id
const getSingleEmergencyPostById = catchAsync(async (req, res) => {
  const { emergencyId } = req.params;
  const result = await EmergencyServices.getSingleEmergencyPostById(emergencyId);

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
  getAllEmergencyPosts,
  getSingleEmergencyPostById,
  deleteProduct,
  // getMyProducts

};
