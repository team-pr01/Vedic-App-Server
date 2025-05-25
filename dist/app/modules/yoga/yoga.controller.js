"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YogaControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const yoga_services_1 = require("./yoga.services");
// Add yoga (For admin)
const addYoga = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBy = req.user.userId;
    console.log(req.body);
    const result = yield yoga_services_1.YogaServices.addYoga(req.body, createdBy);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Yoga added successfully',
        data: result,
    });
}));
// Get all yogas
const getAllYogas = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield yoga_services_1.YogaServices.getAllYogas();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Yogas fetched successfully.",
        data: result,
    });
}));
// Get single yoga by id
const getSingleYogaById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yogaId } = req.params;
    const result = yield yoga_services_1.YogaServices.getSingleYogaById(yogaId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Yoga fetched successfully.',
        data: result,
    });
}));
// Update yoga
const updateYoga = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yogaId } = req.params;
    const result = yield yoga_services_1.YogaServices.updateYoga(yogaId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Yoga details updated successfully',
        data: result,
    });
}));
// Delete yoga by id
const deleteYoga = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yogaId } = req.params;
    const result = yield yoga_services_1.YogaServices.deleteYoga(yogaId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Yoga deleted successfully',
        data: result,
    });
}));
exports.YogaControllers = {
    addYoga,
    getAllYogas,
    getSingleYogaById,
    updateYoga,
    deleteYoga,
};
