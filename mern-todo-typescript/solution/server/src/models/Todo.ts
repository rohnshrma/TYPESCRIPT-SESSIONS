import mongoose from "mongoose";
import { CreateTodoInput } from "../types/todo.js";

// The generic tells Mongoose what a todo document looks like.
// _id, createdAt and updatedAt are added by Mongoose itself.
const todoSchema = new mongoose.Schema<CreateTodoInput>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: { type: Number, enum: [0, 1, 2], default: 1 },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<CreateTodoInput>("Todo", todoSchema);
