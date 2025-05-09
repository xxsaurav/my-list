import { Request, Response, NextFunction } from "express";

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsyncError = (theFunc: AsyncRouteHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await theFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsyncError;
