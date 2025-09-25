import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>(
  {
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: false,
      default: "",
    },
    clicks: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<TProduct>("Product", ProductSchema);
export default Product;
