import { Priority, Todo } from "../types/todo";
import { capitalize, formatDate } from "../utils/helpers";

interface TodoItemProps {
  todo: Readonly<Todo>;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps): JSX.Element {
  const done: boolean = todo.status === "completed";

  return (
    <li className={`todo-item ${done ? "done" : ""}`}>
      <input type="checkbox" checked={done} onChange={() => onToggle(todo)} />

      <div className="content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <small>
          <span className={`badge ${todo.status}`}>{capitalize(todo.status)}</span>{" "}
          {/* Numeric enums can be looked up by number: Priority[1] is "Medium" */}
          Priority: {Priority[todo.priority]}
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
