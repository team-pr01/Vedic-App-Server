import { Schema, model } from "mongoose";
import { TOrganization } from "./organizations.interface";

const OrganizationSchema = new Schema<TOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["gurukul", "vedic_institution", "ashram"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    headTeacher: {
      type: String,
      required: true,
    },
    studentCapacity: {
      type: Number,
      required: true,
    },
    coursesOffered: [{
      type: String,
      required: true,
    }],
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      website: { type: String },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Organization = model<TOrganization>("Organization", OrganizationSchema);
export default Organization;
