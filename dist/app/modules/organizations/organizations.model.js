"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["gurukul", "vedic_institution", "ashram"],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    headTeacher: {
        type: String,
        required: true,
    },
    studentCapacity: {
        type: Number,
        required: true,
    },
    coursesOffered: {
        type: String,
        required: true,
    },
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        website: { type: String },
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
}, { timestamps: true });
const Organization = (0, mongoose_1.model)("Organization", OrganizationSchema);
exports.default = Organization;
