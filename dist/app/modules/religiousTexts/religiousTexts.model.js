"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReligiousTextSchema = new mongoose_1.Schema({
    vedaName: {
        type: String,
        required: true,
    },
    originalText: {
        type: String,
        required: true,
    },
    devanagariText: {
        type: String,
        default: "",
    },
    hindiTranslation: {
        type: String,
        default: "",
    },
    englishTranslation: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    notes: {
        type: String,
        default: "",
    },
    // Rigved
    mandala: {
        type: Number,
        default: null,
    },
    // Samved
    section: {
        type: String,
        enum: ["Purvarchika", "Uttararchika", ""],
        default: "",
    },
    chantNumber: {
        type: Number,
        default: null,
    },
    // Yajurved
    branch: {
        type: String,
        enum: ["Shukla", "Krishna", ""],
        default: "",
    },
    chapterNumber: {
        type: Number,
        default: null,
    },
    verseNumber: {
        type: Number,
        default: null,
    },
    // Atharvaved
    kandNumber: {
        type: Number,
        default: null,
    },
    suktaNumber: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true,
});
const ReligiousText = (0, mongoose_1.model)("ReligiousText", ReligiousTextSchema);
exports.default = ReligiousText;
