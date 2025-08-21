"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SlokOrMantraModelSchema = new mongoose_1.Schema({
    chapterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Chapter", required: true },
    type: {
        type: String,
        enum: ["slok", "mantra"],
        required: true,
    },
    number: { type: Number, required: true },
    originalText: { type: String, required: true },
    translations: {
        type: Map,
        of: String,
        default: {},
    },
}, { timestamps: true });
const SlokOrMantraModel = (0, mongoose_1.model)("SlokOrMantraModel ", SlokOrMantraModelSchema);
exports.default = SlokOrMantraModel;
