import { TReels } from "./reels.interface";
import Reels from "./reels.model";

// Add reel for admin only
const addReel = async (payload: TReels, createdBy:string) => {
  const { title, description, videoUrl, category, tags } = payload;

  const payloadData = {
    title,
    description,
    videoUrl,
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
  return result;
};

export const ReelServices = {
  addReel,
  getAllReels,
  getSingleReelById,
};