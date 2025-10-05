"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BooksSchema = new mongoose_1.Schema({
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
        required: function () {
            return this.structure === "Custom";
        },
    },
    level2Name: {
        type: String,
        required: function () {
            return this.structure === "Custom";
        },
    },
    level3Name: {
        type: String,
        required: function () {
            return this.structure === "Custom";
        },
    },
}, { timestamps: true });
const Books = (0, mongoose_1.model)("Books", BooksSchema);
exports.default = Books;
