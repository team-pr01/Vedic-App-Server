import { TReels } from "./reels.interface";
import Reels from "./reels.model";

// Send emergency message by admin
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

export const ReelServices = {
  addReel,
};