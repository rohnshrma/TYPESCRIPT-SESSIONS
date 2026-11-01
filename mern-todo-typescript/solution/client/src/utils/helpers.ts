import { Todo, TodoStatus } from "../types/todo";

export const STATUSES: TodoStatus[] = ["pending", "in-progress", "completed"];

// index = priority value stored in the database (0, 1, 2)
export const PRIORITY_LABELS: string[] = ["Low", "Medium", "High"];

export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function countByStatus(todos: Todo[], status: TodoStatus): number {
  return todos.filter((todo) => todo.status === status).length;
}

// Union parameter + default parameter
export function formatDate(date: string | Date, withTime: boolean = false): string {
  const d = new Date(date);
  return withTime ? d.toLocaleString() : d.toLocaleDateString();
}

// Anything can be thrown, so the error is `unknown`: narrow it with typeof and `in`
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Something went wrong";
}

export function fail(message: string): never {
  throw new Error(message);
}
