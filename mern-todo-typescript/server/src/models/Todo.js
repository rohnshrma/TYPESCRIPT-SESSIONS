import mongoose from "mongoose";

// status   : "pending" | "in-progress" | "completed"
// priority : 0 = Low, 1 = Medium, 2 = High
const todoSchema = new mongoose.Schema(
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

export default mongoose.model("Todo", todoSchema);
