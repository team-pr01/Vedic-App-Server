"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DailyHoroscopeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const DailyHoroscope = (0, mongoose_1.model)("DailyHoroscope", DailyHoroscopeSchema);
exports.default = DailyHoroscope;
