import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/AppError.js";
import { fail } from "./utils/fail.js";
import { getErrorMessage } from "./utils/getErrorMessage.js";
import { sendResponse } from "./utils/response.js";

// process.env values may be undefined, so check before using them
function getEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) return fail(`${name} is not set in .env`);
  return value;
}

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response): void => {
  sendResponse(res, 200, true, "OK");
});

app.use("/api/todos", todoRoutes);

// Unknown routes
app.use((req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
    await connectDB(getEnv("MONGO_URI"));
    app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", getErrorMessage(error));
    process.exit(1);
  }
};

start();
