import { Schema, model } from "mongoose";
import { TProductBanner } from "./productBanner.interface";

const ProductBannerSchema = new Schema<TProductBanner>(
  {
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductBanner = model<TProductBanner>("ProductBanner", ProductBannerSchema);
export default ProductBanner;
