import { MyList } from "../models/myList";
import { ContentType } from "../types/ContentType";

/**
 * MyList Service
 * This service handles the logic for managing a user's list of items.
 * It includes functions to add, remove, and retrieve items from the list.
 */
export const addToList = async (
  userId: string,
  contentId: string,
  contentType: ContentType
) => {
  const result = await MyList.create({
    userId,
    contentId,
    contentType,
    addedAt: new Date(),
  });

  return result;
};

/**
 * Removes an item from the user's list.
 * @param userId - The ID of the user.
 * @param contentId - The ID of the content to be removed.
 */
export const removeFromList = async (userId: string, contentId: string) => {
  await MyList.deleteOne({ userId, contentId });
};

/**
 * Retrieves a paginated list of items for a user.
 * @param userId - The ID of the user.
 * @param page - The page number to retrieve.
 * @param limit - The number of items per page.
 * @returns An object containing the items, total count, current page, and total pages.
 */
export const getList = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  console.log(`Fetching items for userId: ${userId}, page: ${page}, limit: ${limit}`);
  console.log(`Skip: ${skip}, Limit: ${limit}`);
  const [items, total] = await Promise.all([
    MyList.find({ userId })
      .sort({ addedAt: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    MyList.countDocuments({ userId }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
