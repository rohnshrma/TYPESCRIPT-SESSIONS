import {
  ApiResponse,
  CreateTodoInput,
  Todo,
  TodoStatus,
  UpdateTodoInput,
} from "../types/todo";

// Talks to the Express API. Every response looks like ApiResponse<T>.
class TodoService {
  constructor(private baseUrl: string) {}

  // Generic: the caller decides what T (the type of `data`) is
  private async request<T>(path: string = "", options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const json: ApiResponse<T> = await res.json();

    if (!json.success) {
      throw new Error(json.message || "Request failed");
    }
    return json.data;
  }

  getAll(status?: TodoStatus): Promise<Todo[]> {
    const query = status ? `?status=${status}` : "";
    return this.request<Todo[]>(query);
  }

  getById(id: string): Promise<Todo> {
    return this.request<Todo>(`/${id}`);
  }

  create(todo: CreateTodoInput): Promise<Todo> {
    return this.request<Todo>("", { method: "POST", body: JSON.stringify(todo) });
  }

  update(id: string, changes: UpdateTodoInput): Promise<Todo> {
    return this.request<Todo>(`/${id}`, { method: "PUT", body: JSON.stringify(changes) });
  }

  remove(id: string): Promise<Todo> {
    return this.request<Todo>(`/${id}`, { method: "DELETE" });
  }
}

export const todoService = new TodoService("/api/todos");
