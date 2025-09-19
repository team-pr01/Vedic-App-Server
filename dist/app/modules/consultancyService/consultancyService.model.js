"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConsultancyServiceSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    availableTime: {
        type: String,
        required: true,
    },
    availabilityType: {
        type: [String],
        required: true,
    },
    fees: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const ConsultancyService = (0, mongoose_1.model)("ConsultancyService", ConsultancyServiceSchema);
exports.default = ConsultancyService;
