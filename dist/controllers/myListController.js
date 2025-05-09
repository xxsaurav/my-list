"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyList = exports.removeFromList = exports.addToList = void 0;
const myListService = __importStar(require("../service/myListService"));
const ContentType_1 = require("../types/ContentType");
const addToList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { contentId, contentType } = req.body;
        if (!contentId || !contentType) {
            return res
                .status(400)
                .json({ message: "contentId and contentType are required" });
        }
        if (!Object.values(ContentType_1.ContentType).includes(contentType)) {
            return res.status(400).json({ message: "Invalid contentType" });
        }
        const userId = String((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
        const added = yield myListService.addToList(userId, contentId, contentType);
        res.status(201).json({ message: "Item added to My List", item: added });
    }
    catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            return res.status(409).json({ message: "Item already exists in list" });
        }
        res.status(500).json({ message: "Failed to add item", error: err.message });
    }
});
exports.addToList = addToList;
const removeFromList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { contentId } = req.params;
        if (!contentId) {
            return res.status(400).json({ message: "contentId is required" });
        }
        const userId = String((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id);
        yield myListService.removeFromList(userId, contentId);
        res.status(200).json({ message: "Item removed from list" });
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to remove item", error: err.message });
    }
});
exports.removeFromList = removeFromList;
const getMyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const userId = String((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id);
        const result = yield myListService.getList(userId, page, limit);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get list", error: err.message });
    }
});
exports.getMyList = getMyList;
