import { FaTrash } from "react-icons/fa";
import { Todo } from "./api";
import { FC } from "react";

type Props = {
  todos?: Todo[];
  onUpdate: (todo: Todo) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
};
export const TodoListItems: FC<Props> = ({ todos, onUpdate, onDelete }) => {
  const list = [...(todos || [])];
  return list.map((todo) => {
    return (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            className="min-w-8 min-h-8 mr-4"
            checked={todo.completed}
            id={String(todo.id)}
            onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
          />
          <label htmlFor={String(todo.id)}>{todo.title}</label>
        </div>
        <button
          className="min-w-12 min-h-12 border-2late-300 border-2 rounded-md cursor-pointer flex justify-center items-center bg-slate-100 text-red-500 focus:brightness-110 hover:brightness-110 transition"
          onClick={() => todo.id && onDelete(todo.id)}
        >
          <FaTrash />
        </button>
      </article>
    );
  });
};

