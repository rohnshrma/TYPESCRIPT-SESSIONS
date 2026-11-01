import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response.js";

// The error is `unknown`. Narrow it with typeof and `in` (adv.ts) before using it.
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (typeof err === "object" && err !== null) {
    if ("statusCode" in err && typeof err.statusCode === "number") {
      statusCode = err.statusCode;
    }
    if ("message" in err && typeof err.message === "string") {
      message = err.message;
    }
    // Mongoose: bad ObjectId or failed schema validation
    if ("name" in err && (err.name === "CastError" || err.name === "ValidationError")) {
      statusCode = 400;
    }
  }

  sendResponse(res, statusCode, false, null, message);
};
