"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const course_controller_1 = require("./course.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
// For admin only
router.post("/add-course", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), course_controller_1.CourseControllers.addCourse);
router.get("/", course_controller_1.CourseControllers.getAllCourses);
router.get("/:courseId", course_controller_1.CourseControllers.getSingleCourseById);
router.put("/:courseId", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), course_controller_1.CourseControllers.updateCourse);
router.delete("/:courseId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), course_controller_1.CourseControllers.deleteCourse);
exports.CourseRoutes = router;
