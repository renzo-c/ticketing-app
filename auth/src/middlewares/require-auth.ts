import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-erro";

// implicit assumption: we are not using require middleware
// without previously running the current-user middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
