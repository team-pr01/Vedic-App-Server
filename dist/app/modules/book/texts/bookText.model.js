"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookTextSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Books",
        required: [true, "Book ID is required"],
    },
    location: {
        chapter: {
            type: String,
            required: [true, "Chapter is required"],
            trim: true,
        },
        verse: {
            type: String,
            required: [true, "Verse is required"],
            trim: true,
        },
    },
    originalText: {
        type: String,
        required: [true, "Original text is required"],
        trim: true,
    },
    primaryTranslation: {
        type: String,
        required: [true, "Primary translation is required"],
        trim: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    idVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const BookText = (0, mongoose_1.model)("BookText", BookTextSchema);
exports.default = BookText;
