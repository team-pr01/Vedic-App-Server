"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ApiKeySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: ["Recipe", "AI Chat", "AI Quiz", "Language Translation"],
    },
    key: { type: String, required: true },
}, {
    timestamps: true,
});
const ApiKeys = (0, mongoose_1.model)("ApiKeys", ApiKeySchema);
exports.default = ApiKeys;
