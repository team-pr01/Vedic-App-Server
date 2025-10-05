import { Schema, model } from "mongoose";
import { TBooks } from "./books.interface";

const BooksSchema = new Schema<TBooks>(
  {
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["veda", "purana", "upanishad"],
      required: [true, "Book type is required"],
    },
    structure: {
      type: String,
      enum: ["Chapter-Verse", "Mandala-Sukta-Rik", "Kanda-Sarga-Shloka", "Custom"],
      required: [true, "Structure is required"],
    },
    level1Name: {
      type: String,
      required: function (this: TBooks) {
        return this.structure === "Custom";
      },
    },
    level2Name: {
      type: String,
      required: function (this: TBooks) {
        return this.structure === "Custom";
      },
    },
    level3Name: {
      type: String,
      required: function (this: TBooks) {
        return this.structure === "Custom";
      },
    },
  },
  { timestamps: true }
);

const Books = model<TBooks>("Books", BooksSchema);
export default Books;
