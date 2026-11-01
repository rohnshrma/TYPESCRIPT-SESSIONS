import { Request, Response } from "express";
import Todo from "../models/Todo.js";
import { AppError } from "../utils/AppError.js";
import { sendResponse } from "../utils/response.js";
import { CreateTodoInput, TodoStatus, UpdateTodoInput } from "../types/todo.js";

// GET /api/todos?status=pending
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.query;
  const filter: { status?: TodoStatus } = {};

  // req.query.status could be anything, so narrow it to a valid status first
  if (status === "pending" || status === "in-progress" || status === "completed") {
    filter.status = status;
  }

  const todos = await Todo.find(filter).sort({ createdAt: -1 });
  sendResponse(res, 200, true, todos);
};

// GET /api/todos/:id
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo);
};

// POST /api/todos
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const body: CreateTodoInput = req.body;

  if (!body.title || !body.title.trim()) {
    throw new AppError("Title is required", 400);
  }

  const todo = await Todo.create(body);
  sendResponse(res, 201, true, todo, "Todo created");
};

// PUT /api/todos/:id
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const changes: UpdateTodoInput = req.body;

  const todo = await Todo.findByIdAndUpdate(req.params.id, changes, {
    new: true,
    runValidators: true,
  });
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo, "Todo updated");
};

// DELETE /api/todos/:id
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) throw new AppError("Todo not found", 404);
  sendResponse(res, 200, true, todo, "Todo deleted");
};
