import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface userPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  // If there is anything wrong with the decoding process, we want to capture de error
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (error) {
    console.warn(error);
  }

  // regardless an error exists, we always want to pass to the next middleware
  next();
};
