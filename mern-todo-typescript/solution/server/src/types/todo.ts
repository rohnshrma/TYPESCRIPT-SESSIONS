// Literal union (hello.ts)
export type TodoStatus = "pending" | "in-progress" | "completed";

// Enum (hello.ts): Low = 0, Medium = 1, High = 2
export enum Priority {
  Low,
  Medium,
  High,
}

// Interface with readonly and optional properties (objects.ts)
export interface Todo {
  readonly _id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: Priority;
  dueDate?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// Generic interface (adv.ts)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility types (ut.ts)
export type CreateTodoInput = Omit<Todo, "_id" | "createdAt" | "updatedAt">;
export type UpdateTodoInput = Partial<CreateTodoInput>;
export type TodoPreview = Pick<Todo, "_id" | "title" | "status">;
