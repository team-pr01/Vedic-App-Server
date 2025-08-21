import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TReels } from "./reels.interface";
import Reels from "./reels.model";

// Add reel for admin only
const addReel = async (payload: TReels, createdBy:string) => {
  const { title, description, videoUrl, videoSource, category, tags } = payload;

  const payloadData = {
    title,
    description,
    videoUrl,
    videoSource,
    category,
    tags,
    createdBy
  };

  const result = await Reels.create(payloadData);  

  return result;
};


// Get all reels
const getAllReels = async () => {
  const result = await Reels.find();
  return result;
};

// Get single reel post by id
const getSingleReelById = async (reelId: string) => {
  const result = await Reels.findById(reelId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Reel not found");
  }
  return result;
};

// Update reel
const updateReel = async (
  reelId: string,
  payload: Partial<TReels>
) => {
  const existingPost = await Reels.findById(reelId);

  if (!existingPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Reel not found");
  }

  const result = await Reels.findByIdAndUpdate(reelId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete reel by id
const deleteReel = async (reelId: string) => {
  const result = await Reels.findByIdAndDelete(reelId);
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, "Reel not found");
  }
  return result;
};

export const ReelServices = {
  addReel,
  getAllReels,
  getSingleReelById,
  updateReel,
  deleteReel,
};