/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TTemple } from "./temples.interface";
import Temple from "./temples.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

// Add temple for admin only
const addTemple = async (
  payload: TTemple,
  file: Express.Multer.File | undefined
) => {
  const {
    name,
    mainDeity,
    description,
    address,
    city,
    state,
    country,
    establishedYear,
    visitingHours,
    phone,
    email,
    website,
    // mediaGallery,
    videoUrl,
    createdBy,
  } = payload;

  let imageUrl = "";

  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    name,
    mainDeity,
    description,
    address,
    city,
    state,
    country,
    establishedYear,
    visitingHours,
    phone,
    email,
    website,
    events: [],
    // mediaGallery,
    videoUrl,
    createdBy,
    imageUrl,
  };

  const result = await Temple.create(payloadData);
  return result;
};

// Get all temples
const getAllTemples = async (keyword:string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
    ];
  }
  const result = await Temple.find(query);
  return result;
};

// Get single temple post by id
const getSingleTempleById = async (templeId: string) => {
  const result = await Temple.findById(templeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }
  return result;
};

// Update temple
const updateTemple = async (templeId: string, payload: Partial<TTemple>) => {
  const existingTemple = await Temple.findById(templeId);

  if (!existingTemple) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }

  const result = await Temple.findByIdAndUpdate(templeId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete temple by id
const deleteTemple = async (templeId: string) => {
  const result = await Temple.findByIdAndDelete(templeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }
  return result;
};

// Add event to a temple
const addEventToTemple = async (templeId: string, eventData: any) => {
  const temple = await Temple.findById(templeId);

  if (!temple) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }

  temple?.events?.push(eventData);
  await temple.save();
  return temple;
};

// Delete event from a temple
const deleteEventFromTemple = async (templeId: string, eventId: string) => {
  const temple = await Temple.findById(templeId);

  if (!temple) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }

  temple.events = temple?.events?.filter(
    (event: any) => event._id.toString() !== eventId
  );

  await temple.save();
  return temple;
};

export const TempleServices = {
  addTemple,
  getAllTemples,
  getSingleTempleById,
  updateTemple,
  deleteTemple,
  addEventToTemple,
  deleteEventFromTemple,
};
