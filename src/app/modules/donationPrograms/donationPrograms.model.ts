import { Schema, model } from "mongoose";
import { TDonationPrograms } from "./donationPrograms.interface";

const DonationProgramSchema = new Schema<TDonationPrograms>(
  {
    imageUrl: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amountNeeded: {
      type: String,
      required: true,
    },
    amountRaised: {
      type: String,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const DonationPrograms = model<TDonationPrograms>(
  "DonationPrograms",
  DonationProgramSchema
);

export default DonationPrograms;
