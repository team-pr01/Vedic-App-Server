"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookTextSchema = new mongoose_1.Schema({
    bookId: { type: mongoose_1.Types.ObjectId, ref: "Books", required: true },
    location: [
        {
            levelName: { type: String, required: true },
            value: { type: String, required: true, trim: true },
        },
    ],
    originalText: { type: String, required: true, trim: true },
    primaryTranslation: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
const BookText = (0, mongoose_1.model)("BookText", BookTextSchema);
exports.default = BookText;
