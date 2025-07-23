"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChapterSchema = new mongoose_1.Schema({
    bookId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    title: { type: String, required: true },
    type: [
        {
            type: {
                type: String,
                required: true,
            },
        },
    ],
    order: { type: Number, default: 0 },
}, { timestamps: true });
const Chapter = (0, mongoose_1.model)("Chapter", ChapterSchema);
exports.default = Chapter;
