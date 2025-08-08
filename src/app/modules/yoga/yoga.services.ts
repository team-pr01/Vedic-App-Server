/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TYoga } from "./yoga.interface";
import Yoga from "./yoga.model";
import Emergency from "../emergency/emergency.model";
import { User } from "../auth/auth.model";
import Book from "../religiousTextsNew/book/book.model";
import Organization from "../organizations/organizations.model";
import Course from "../course/course.model";
import Reels from "../reels/reels.model";
import Vastu from "../vastu/vastu.model";
import Temple from "../temples/temples.model";
import ConsultancyService from "../consultancyService/consultancyService.model";
import Recipe from "../recipe/recipe.model";
import ApiKeys from "../apiKeys/apiKeys.model";

// Add yoga for admin only
const addYoga = async (payload: TYoga, createdBy: string) => {
  const {
    name,
    sanskritName,
    description,
    videoUrl,
    difficulty,
    duration,
    benefits,
    contraindications,
    categories,
  } = payload;

  const payloadData = {
    name,
    sanskritName,
    description,
    videoUrl,
    difficulty,
    duration,
    benefits,
    contraindications,
    categories,
    createdBy,
  };

  const result = await Yoga.create(payloadData);

  return result;
};

// Get all yogas
const getAllYogas = async (keyword: any) => {
  const filter: any = {};

  if (keyword) {
    filter.name = { $regex: keyword, $options: "i" };
  }

  const result = await Yoga.find();
  return result;
};

// Get admin stats
const getAdminStats = async () => {

    const [
      pendingEmergencies,
      totalUsers,
      totalBooks,
      totalOrganizations,
      totalCourses,
      totalReels,
      totalYogas,
      totalVastus,
      totalTemples,
      totalConsultancies,
      totalRecipes,
      totalApiKeys,
    ] = await Promise.all([
      Emergency.countDocuments({ status: 'pending' }),
      User.countDocuments(),
      Book.countDocuments(),
      Organization.countDocuments(),
      Course.countDocuments(),
      Reels.countDocuments(),
      Yoga.countDocuments(),
      Vastu.countDocuments(),
      Temple.countDocuments(),
      ConsultancyService.countDocuments(),
      Recipe.countDocuments(),
      ApiKeys.countDocuments(),
    ]);

    return {
      pendingEmergencies,
      totalUsers,
      totalBooks,
      totalOrganizations,
      totalCourses,
      totalReels,
      totalYogas,
      totalVastus,
      totalTemples,
      totalConsultancies,
      totalRecipes,
      totalApiKeys,
    };
};

// Get single yoga post by id
const getSingleYogaById = async (yogaId: string) => {
  const result = await Yoga.findById(yogaId);
  return result;
};

// Update yoga
const updateYoga = async (yogaId: string, payload: Partial<TYoga>) => {
  const existingPost = await Yoga.findById(yogaId);

  if (!existingPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Yoga not found");
  }

  const result = await Yoga.findByIdAndUpdate(yogaId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete yoga by id
const deleteYoga = async (yogaId: string) => {
  const result = await Yoga.findByIdAndDelete(yogaId);
  return result;
};

export const YogaServices = {
  addYoga,
  getAllYogas,
  getSingleYogaById,
  updateYoga,
  deleteYoga,
  getAdminStats,
};
