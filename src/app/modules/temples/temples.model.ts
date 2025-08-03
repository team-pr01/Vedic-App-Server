import { Schema, model } from "mongoose";
import { TTemple } from "./temples.interface";

const TempleSchema = new Schema<TTemple>(
  {
    name: {
      type: String,
      required: true,
    },
    mainDeity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    visitingHours: {
      type: String,
      required: true,
    },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
    imageUrl: {
      type: String,
      required: true,
    },
    // mediaGallery: {
    //   type: [String],
    //   required: true,
    // },
    videoUrl: {
      type: String,
    },
    events: [
      {
        name: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    status : {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'draft',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Temple = model<TTemple>("Temple", TempleSchema);
export default Temple;
