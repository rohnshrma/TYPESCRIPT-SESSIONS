import { sendResponse } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  // Mongoose: bad ObjectId or failed schema validation
  if (err.name === "CastError" || err.name === "ValidationError") {
    statusCode = 400;
  }

  sendResponse(res, statusCode, false, null, err.message);
};
