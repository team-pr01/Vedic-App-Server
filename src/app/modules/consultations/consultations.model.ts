import { Schema, model } from "mongoose";
import { TConsultation } from "./consultations.interface";

const ConsultationSchema = new Schema<TConsultation>(
  {
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
   consultantId: {
    type: Schema.Types.ObjectId,
    ref: "ConsultancyService",
    required: true,
   },
   concern: {
    type: String,
    required: false,
   },
   fees: {
    type: String,
    required: true,
   },
   scheduledAt: {
    type: Date,
    required: false,
   },
   status : {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
   }
  },
  {
    timestamps: true,
  }
);

const Consultation = model<TConsultation>("Consultation", ConsultationSchema);
export default Consultation;
