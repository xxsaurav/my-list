"use strict";
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
exports.getList = exports.removeFromList = exports.addToList = void 0;
const myList_1 = require("../models/myList");
/**
 * MyList Service
 * This service handles the logic for managing a user's list of items.
 * It includes functions to add, remove, and retrieve items from the list.
 */
const addToList = (userId, contentId, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield myList_1.MyList.create({
        userId,
        contentId,
        contentType,
        addedAt: new Date(),
    });
    return result;
});
exports.addToList = addToList;
/**
 * Removes an item from the user's list.
 * @param userId - The ID of the user.
 * @param contentId - The ID of the content to be removed.
 */
const removeFromList = (userId, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield myList_1.MyList.deleteOne({ userId, contentId });
});
exports.removeFromList = removeFromList;
/**
 * Retrieves a paginated list of items for a user.
 * @param userId - The ID of the user.
 * @param page - The page number to retrieve.
 * @param limit - The number of items per page.
 * @returns An object containing the items, total count, current page, and total pages.
 */
const getList = (userId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    console.log(`Fetching items for userId: ${userId}, page: ${page}, limit: ${limit}`);
    console.log(`Skip: ${skip}, Limit: ${limit}`);
    const [items, total] = yield Promise.all([
        myList_1.MyList.find({ userId })
            .sort({ addedAt: 1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        myList_1.MyList.countDocuments({ userId }),
    ]);
    return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getList = getList;
