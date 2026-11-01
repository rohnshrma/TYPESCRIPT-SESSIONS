import { Response } from "express";
import { ApiResponse } from "../types/todo.js";

// Generic function (adv.ts): T is whatever `data` is
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T,
  message?: string
): void => {
  const body: ApiResponse<T> = { success, data };
  if (message) body.message = message;
  res.status(statusCode).json(body);
};
