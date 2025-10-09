import { ObjectId } from "mongoose";

export type TLocation = {
  levelName: string;
  value: string;
};

export type TBookText = {
  bookId: ObjectId;
  location: TLocation[];
  originalText: string;
  primaryTranslation: string;
  tags: string[];
  isVerified?: boolean;
};
