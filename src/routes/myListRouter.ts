import express from "express";
import * as myListController from "../controllers/myListController";
import catchAsyncError from "../middlewares/catchAsyncError";

const router = express.Router();

// POST /api/mylist
router.post("/", catchAsyncError(myListController.addToList));

// DELETE /api/mylist/:contentId
router.delete("/:contentId", catchAsyncError(myListController.removeFromList));

// GET /api/mylist?page=1&limit=10
router.get("/", catchAsyncError(myListController.getMyList));

export default router;
