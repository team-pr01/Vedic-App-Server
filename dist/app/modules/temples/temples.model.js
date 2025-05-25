"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TempleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    mainDeity: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    establishedYear: {
        type: Number,
        required: true,
    },
    visitingHours: {
        type: String,
        required: true,
    },
    contactInfo: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
    },
    imageUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Temple = (0, mongoose_1.model)("Temple", TempleSchema);
exports.default = Temple;
