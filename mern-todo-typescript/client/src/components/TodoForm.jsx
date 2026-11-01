import { useState } from "react";
import { PRIORITY_LABELS, STATUSES, capitalize } from "../utils/helpers.js";

export default function TodoForm({ initialTodo, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialTodo?.title ?? "");
  const [description, setDescription] = useState(initialTodo?.description ?? "");
  const [status, setStatus] = useState(initialTodo?.status ?? "pending");
  const [priority, setPriority] = useState(initialTodo?.priority ?? 1);
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate?.slice(0, 10) ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
    });

    if (!initialTodo) {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority(1);
      setDueDate("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>

        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          {PRIORITY_LABELS.map((label, index) => (
            <option key={label} value={index}>
              {label}
            </option>
          ))}
        </select>

        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      <div className="row">
        <button type="submit">{initialTodo ? "Update Todo" : "Add Todo"}</button>
        {initialTodo && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
