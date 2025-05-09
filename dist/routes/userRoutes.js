"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post("/", (0, catchAsyncError_1.default)(userController_1.createUser));
router.get("/", (0, catchAsyncError_1.default)(userController_1.getAllUsers));
exports.default = router;
