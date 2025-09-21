import { Schema, model } from "mongoose";
import { TDonation } from "./donation.interface";

const DonationSchema = new Schema<TDonation>(
  {
    imageUrl: { type: String, required: false },
    donationProgramId: {
      type: Schema.Types.ObjectId,
      ref: "DonationProgram",
      required: true,
    },
    donationProgramTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = model<TDonation>("Donation", DonationSchema);
export default Donation;
