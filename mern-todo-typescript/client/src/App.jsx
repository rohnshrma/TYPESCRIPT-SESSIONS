import { useEffect, useState } from "react";
import { todoService } from "./api/todoApi.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import { STATUSES, capitalize, countByStatus, getErrorMessage } from "./utils/helpers.js";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");
      setTodos(await todoService.getAll(filter));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [filter]);

  const handleSubmit = async (values) => {
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

  const handleToggle = async (todo) => {
    const status = todo.status === "completed" ? "pending" : "completed";
    try {
      const updated = await todoService.update(todo._id, { status });
      setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.remove(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
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
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
