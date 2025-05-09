"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyList = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContentType_1 = require("../types/ContentType");
const myListSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, index: true },
    contentId: { type: String, required: true },
    contentType: { type: String, enum: Object.values(ContentType_1.ContentType), required: true },
    addedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
myListSchema.index({ userId: 1, contentId: 1 }, { unique: true });
exports.MyList = mongoose_1.default.model("MyList", myListSchema);
