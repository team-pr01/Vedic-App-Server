"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationProgramRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const donationPrograms_controller_1 = require("./donationPrograms.controller");
const router = express_1.default.Router();
// Create a donation program
router.post("/", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), donationPrograms_controller_1.DonationProgramsController.createDonationProgram);
// Get all donation programs (public)
router.get("/", donationPrograms_controller_1.DonationProgramsController.getAllDonationPrograms);
// Get single donation program by ID (public)
router.get("/:donationProgramId", donationPrograms_controller_1.DonationProgramsController.getSingleDonationProgramById);
// Update donation program
router.put("/:donationProgramId", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), donationPrograms_controller_1.DonationProgramsController.updateDonationProgram);
// Delete donation program
router.delete("/:donationProgramId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), donationPrograms_controller_1.DonationProgramsController.deleteDonationProgram);
exports.DonationProgramRoutes = router;
