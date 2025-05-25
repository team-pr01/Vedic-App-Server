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
exports.OrganizationControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const organizations_services_1 = require("./organizations.services");
// Add Organization
const addOrganization = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield organizations_services_1.OrganizationServices.addOrganization(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Organization added successfully",
        data: result,
    });
}));
// Get All
const getAllOrganizations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield organizations_services_1.OrganizationServices.getAllOrganizations();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Organizations fetched successfully.",
        data: result,
    });
}));
// Get Single
const getSingleOrganizationById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orgId } = req.params;
    const result = yield organizations_services_1.OrganizationServices.getSingleOrganizationById(orgId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Organization fetched successfully.",
        data: result,
    });
}));
// Update
const updateOrganization = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orgId } = req.params;
    const result = yield organizations_services_1.OrganizationServices.updateOrganization(orgId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Organization updated successfully.",
        data: result,
    });
}));
// Delete
const deleteOrganization = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orgId } = req.params;
    const result = yield organizations_services_1.OrganizationServices.deleteOrganization(orgId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Organization deleted successfully.",
        data: result,
    });
}));
exports.OrganizationControllers = {
    addOrganization,
    getAllOrganizations,
    getSingleOrganizationById,
    updateOrganization,
    deleteOrganization,
};
