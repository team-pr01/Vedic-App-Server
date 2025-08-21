"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReligiousTextRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const religiousTexts_controller_1 = require("./religiousTexts.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
// Create a new religious text entry (admin only)
router.post("/add", (0, auth_1.default)('admin', 'moderator'), (0, authorizeRoute_1.default)(), religiousTexts_controller_1.ReligiousTextControllers.createReligiousText);
// Get all religious texts (with optional filters)
router.get("/", religiousTexts_controller_1.ReligiousTextControllers.getAllReligiousTexts);
// Get a single religious text by ID
router.get("/:id", religiousTexts_controller_1.ReligiousTextControllers.getReligiousTextById);
// Update a religious text by ID (admin only)
router.put("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin), religiousTexts_controller_1.ReligiousTextControllers.updateReligiousText);
// Delete a religious text by ID (admin only)
router.delete("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin), religiousTexts_controller_1.ReligiousTextControllers.deleteReligiousText);
exports.ReligiousTextRoutes = router;
