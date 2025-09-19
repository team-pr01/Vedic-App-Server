"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConsultationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    consultantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ConsultancyService",
        required: true,
    },
    concern: {
        type: String,
        required: false,
    },
    fees: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    }
}, {
    timestamps: true,
});
const Consultation = (0, mongoose_1.model)("Consultation", ConsultationSchema);
exports.default = Consultation;
