export const STATUSES = ["pending", "in-progress", "completed"];

// index = priority value stored in the database (0, 1, 2)
export const PRIORITY_LABELS = ["Low", "Medium", "High"];

export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function countByStatus(todos, status) {
  return todos.filter((todo) => todo.status === status).length;
}

export function formatDate(date, withTime = false) {
  const d = new Date(date);
  return withTime ? d.toLocaleString() : d.toLocaleDateString();
}

// Turns anything thrown (Error, string, ...) into a readable message
export function getErrorMessage(error) {
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Something went wrong";
}

export function fail(message) {
  throw new Error(message);
}
