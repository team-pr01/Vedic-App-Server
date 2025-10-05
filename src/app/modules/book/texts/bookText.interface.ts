import { ObjectId } from "mongoose";

export type TBookText = {
  bookId: ObjectId;
  location: {
    chapter: string;
    verse: string;
  };
  originalText: string;
  primaryTranslation: string;
  tags: string[];
  idVerified?: boolean;
};
