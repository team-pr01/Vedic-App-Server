import { Schema, model } from "mongoose";
import { TApiKeys } from "./apiKeys.interface";

const ApiKeySchema = new Schema<TApiKeys>(
  {
    name: {
  type: String,
  required: true,
  enum: ["Recipe", "AI Chat", "AI Quiz", "Language Translation"],
},

    key: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ApiKeys = model<TApiKeys>("ApiKeys", ApiKeySchema);

export default ApiKeys;
