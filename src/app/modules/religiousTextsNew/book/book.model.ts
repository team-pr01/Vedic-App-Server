import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const BookSchema = new Schema<TBook>(
  {
    imageUrl: { type: String, required: true, default: "" }, // Made required but kept default
    title: { type: String, required: true }, //Book name
    category: { type: String, required: true }, // Ramayan/Ved/etc
    subCategory: { type: String, default: "" }, // Rigved/etc
    description: { type: String, default: "" },
    sections: [
      // Mandal/Kand/Addhay
      {
        name: { type: String, default: "" }, // Mandal/Chapter
        number: { type: String, default: "" }, //Mandal no, Chapter No etc
        contents: [
          // Sukta 1/Sarga
          {
            type: { type: String, default: "" }, //Sukta/Sarga/etc
            number: { type: String, default: "" }, //Sukta no, Sarga No etc
            contents: [
              // Slok/Mantra
              {
                name: { type: String, required: false, default: "" },
                number: { type: String, default: "" }, //Mantra no, Slok No etc
                originalText: { type: String, required: false, default: "" },
                translations: [
                  {
                    language: { type: String, required: true },
                    description: { type: String, default: "" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Book = model<TBook>("Book", BookSchema);
export default Book;
