import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps): JSX.Element {
  if (todos.length === 0) {
    return <p className="empty">No todos found.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
