import { ObjectId } from "mongoose";

export type TReportMantra = {
  bookId: ObjectId;
  textId: ObjectId;
  originalText: string;
  translation: string;
  reason : string;
  feedback : string;
  status : "pending" | "resolved";
  isHumanVerified?: boolean;
};
