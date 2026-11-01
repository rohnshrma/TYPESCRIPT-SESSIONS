import Todo from "../models/Todo.js";
import { AppError } from "../utils/AppError.js";
import { sendResponse } from "../utils/response.js";

// GET /api/todos?status=pending
export const getTodos = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const todos = await Todo.find(filter).sort({ createdAt: -1 });
  sendResponse(res, 200, true, todos);
};

// GET /api/todos/:id
export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo);
};

// POST /api/todos
export const createTodo = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || !title.trim()) {
    throw new AppError("Title is required", 400);
  }

  const todo = await Todo.create({ title, description, status, priority, dueDate });
  sendResponse(res, 201, true, todo, "Todo created");
};

// PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo, "Todo updated");
};

// DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo, "Todo deleted");
};
