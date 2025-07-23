"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SlokOrMantraSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["slok", "mantra"],
        required: true,
    },
    number: { type: String, required: true },
    originalText: { type: String, required: true },
    translations: {
        type: Map,
        of: String,
        default: {},
    },
}, { _id: false, timestamps: true });
const ChapterSchema = new mongoose_1.Schema({
    chapterTitle: { type: String, default: "" },
    type: [{ type: String, default: [] }],
    order: { type: Number, default: 0 },
    slokOrMantras: { type: [SlokOrMantraSchema], default: [] },
}, { _id: false });
const BookSchema = new mongoose_1.Schema({
    imageUrl: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    chapters: { type: [ChapterSchema], default: [] },
}, { timestamps: true });
const Book = (0, mongoose_1.model)("Book", BookSchema);
exports.default = Book;
