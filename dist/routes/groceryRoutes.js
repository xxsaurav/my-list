"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const groceryItemController_1 = require("../controllers/groceryItemController");
const router = express_1.default.Router();
router.post("/", (0, catchAsyncError_1.default)(groceryItemController_1.addGroceryItem));
router.get("/", (0, catchAsyncError_1.default)(groceryItemController_1.viewGroceryItems));
router.put("/:id", (0, catchAsyncError_1.default)(groceryItemController_1.updateGroceryItem));
router.delete("/:id", (0, catchAsyncError_1.default)(groceryItemController_1.removeGroceryItem));
router.patch("/inventory", (0, catchAsyncError_1.default)(groceryItemController_1.manageInventory));
exports.default = router;
