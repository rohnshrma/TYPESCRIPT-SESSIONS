import { PRIORITY_LABELS, capitalize, formatDate } from "../utils/helpers.js";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const done = todo.status === "completed";

  return (
    <li className={`todo-item ${done ? "done" : ""}`}>
      <input type="checkbox" checked={done} onChange={() => onToggle(todo)} />

      <div className="content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <small>
          <span className={`badge ${todo.status}`}>{capitalize(todo.status)}</span>{" "}
          Priority: {PRIORITY_LABELS[todo.priority]}
          {todo.dueDate && ` · Due ${formatDate(todo.dueDate)}`}
          {` · Created ${formatDate(todo.createdAt, true)}`}
        </small>
      </div>

      <div className="actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button className="danger" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
