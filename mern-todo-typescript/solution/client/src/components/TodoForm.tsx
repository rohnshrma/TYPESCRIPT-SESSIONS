import { ChangeEvent, FormEvent, useState } from "react";
import { CreateTodoInput, Priority, Todo, TodoStatus } from "../types/todo";
import { PRIORITY_LABELS, STATUSES, capitalize } from "../utils/helpers";

interface TodoFormProps {
  initialTodo: Todo | null;
  onSubmit: (values: CreateTodoInput) => void;
  onCancel: () => void;
}

export default function TodoForm({
  initialTodo,
  onSubmit,
  onCancel,
}: TodoFormProps): JSX.Element {
  const [title, setTitle] = useState<string>(initialTodo?.title ?? "");
  const [description, setDescription] = useState<string>(initialTodo?.description ?? "");
  const [status, setStatus] = useState<TodoStatus>(initialTodo?.status ?? "pending");
  const [priority, setPriority] = useState<Priority>(initialTodo?.priority ?? Priority.Medium);
  const [dueDate, setDueDate] = useState<string>(initialTodo?.dueDate?.slice(0, 10) ?? "");

  // The select gives a plain string, so narrow it to a valid status
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    if (value === "pending" || value === "in-progress" || value === "completed") {
      setStatus(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
      setPriority(Priority.Medium);
      setDueDate("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
      />

      <div className="row">
        <select value={status} onChange={handleStatusChange}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setPriority(Number(e.target.value))}
        >
          {PRIORITY_LABELS.map((label, index) => (
            <option key={label} value={index}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
        />
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
