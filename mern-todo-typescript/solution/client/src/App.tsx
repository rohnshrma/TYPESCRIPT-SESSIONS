import { ChangeEvent, useEffect, useState } from "react";
import { todoService } from "./api/todoApi";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { CreateTodoInput, Todo, TodoStatus } from "./types/todo";
import { STATUSES, capitalize, countByStatus, getErrorMessage } from "./utils/helpers";

export default function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus | "">("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      // "" means "all", so pass undefined to the API
      setTodos(await todoService.getAll(filter || undefined));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [filter]);

  const handleSubmit = async (values: CreateTodoInput): Promise<void> => {
    try {
      setError("");
      if (editingTodo) {
        const updated = await todoService.update(editingTodo._id, values);
        setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTodo(null);
      } else {
        const created = await todoService.create(values);
        setTodos((prev) => [created, ...prev]);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleToggle = async (todo: Todo): Promise<void> => {
    const status: TodoStatus = todo.status === "completed" ? "pending" : "completed";
    try {
      const updated = await todoService.update(todo._id, { status });
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await todoService.remove(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // The select gives a plain string, so narrow it to a valid filter value
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    if (
      value === "" ||
      value === "pending" ||
      value === "in-progress" ||
      value === "completed"
    ) {
      setFilter(value);
    }
  };

  return (
    <main className="container">
      <h1>MERN Todo</h1>

      <section className="stats">
        {STATUSES.map((s) => (
          <span key={s} className={`badge ${s}`}>
            {capitalize(s)}: {countByStatus(todos, s)}
          </span>
        ))}
      </section>

      {error && <p className="error">{error}</p>}

      <TodoForm
        key={editingTodo ? editingTodo._id : "new"}
        initialTodo={editingTodo}
        onSubmit={handleSubmit}
        onCancel={() => setEditingTodo(null)}
      />

      <div className="filter">
        <label htmlFor="filter">Show: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onEdit={setEditingTodo}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
