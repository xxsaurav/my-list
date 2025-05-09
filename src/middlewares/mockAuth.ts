import { Request, Response, NextFunction } from "express";

// This simulates an authenticated user.
export const mockAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = { id: "user_123" }; // Hardcoded for assignment/testing
  next();
};
