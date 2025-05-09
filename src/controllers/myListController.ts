import { Request, Response } from "express";
import * as myListService from "../service/myListService";
import { ContentType } from "../types/ContentType";

export const addToList = async (req: Request, res: Response) => {
  try {
    const { contentId, contentType } = req.body;

    if (!contentId || !contentType) {
      return res
        .status(400)
        .json({ message: "contentId and contentType are required" });
    }

    if (!Object.values(ContentType).includes(contentType)) {
      return res.status(400).json({ message: "Invalid contentType" });
    }

    const userId = String(req?.user?.id);

    const added = await myListService.addToList(userId, contentId, contentType);
    res.status(201).json({ message: "Item added to My List", item: added });
  } catch (err: any) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(409).json({ message: "Item already exists in list" });
    }

    res.status(500).json({ message: "Failed to add item", error: err.message });
  }
};

export const removeFromList = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;

    if (!contentId) {
      return res.status(400).json({ message: "contentId is required" });
    }
    const userId = String(req?.user?.id);
    await myListService.removeFromList(userId, contentId);
    res.status(200).json({ message: "Item removed from list" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Failed to remove item", error: err.message });
  }
};

export const getMyList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const userId = String(req?.user?.id);
    const result = await myListService.getList(userId, page, limit);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to get list", error: err.message });
  }
};
