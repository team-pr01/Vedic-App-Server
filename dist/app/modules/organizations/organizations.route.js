"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const organizations_controller_1 = require("./organizations.controller");
const router = express_1.default.Router();
router.post("/add-organization", (0, auth_1.default)(auth_constannts_1.UserRole.admin), organizations_controller_1.OrganizationControllers.addOrganization);
router.get("/", organizations_controller_1.OrganizationControllers.getAllOrganizations);
router.get("/:orgId", organizations_controller_1.OrganizationControllers.getSingleOrganizationById);
router.put("/:orgId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), organizations_controller_1.OrganizationControllers.updateOrganization);
router.delete("/:orgId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), organizations_controller_1.OrganizationControllers.deleteOrganization);
exports.OrganizationRoutes = router;
