"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const myListRouter_1 = __importDefault(require("./routes/myListRouter"));
const mockAuth_1 = require("./middlewares/mockAuth");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(mockAuth_1.mockAuthMiddleware); // Use the mock user
app.use("/api/mylist", myListRouter_1.default);
app.use(errorMiddleware_1.default);
exports.default = app;
