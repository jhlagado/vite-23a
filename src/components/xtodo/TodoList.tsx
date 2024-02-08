import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { FaTrash, FaUpload } from "react-icons/fa";
import { Todo, SERVER_URL as cacheKey, getTodos } from "./todosApi";
import {
  addTodoMutation,
  addTodoMutationOptions,
  deleteTodoMutation,
  deleteTodoMutationOptions,
  updateTodoMutation,
  updateTodoMutationOptions,
} from "./mutations";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const { isLoading, error, data: todos, mutate } = useSWR(cacheKey, getTodos);

  const handleAdd = async (newTodo: Todo) => {
    if (!todos) return;
    try {
      await mutate(
        addTodoMutation(newTodo, todos),
        addTodoMutationOptions(newTodo, todos)
      );
      toast.success("Success! Added a new item", {
        duration: 2000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to added new item", { duration: 2000 });
    }
  };

  const handleUpdate = async (updatedTodo: Todo) => {
    if (!todos) return;
    try {
      await mutate(
        updateTodoMutation(updatedTodo, todos),
        updateTodoMutationOptions(updatedTodo, todos)
      );
      toast.success("Success! Updated item", {
        duration: 2000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to update item", { duration: 2000 });
    }
  };

  const handleDelete = async (id: number) => {
    if (!todos) return;
    try {
      await mutate(
        deleteTodoMutation(id, todos),
        deleteTodoMutationOptions(id, todos)
      );
      toast.success("Success! Deleted item", {
        duration: 2000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to delete item", { duration: 2000 });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd({
      userId: 1,
      title: newTodo,
      completed: false,
      id: 9999, // ignored
    });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          className="w-full p-2 rounded-sm border-solid border-2 border-slate-800"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="min-w-12 min-h-12 border-2late-300 border-2 rounded-md cursor-pointer flex justify-center items-center bg-slate-100 text-slate-500 focus:text-lime-500 hover:text-lime-500">
        <FaUpload />
      </button>
    </form>
  );
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    const list = [...(todos || [])];
    content = list.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              className="min-w-8 min-h-8 mr-4"
              checked={todo.completed}
              id={String(todo.id)}
              onChange={() =>
                handleUpdate({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={String(todo.id)}>{todo.title}</label>
          </div>
          <button
            className="min-w-12 min-h-12 border-2late-300 border-2 rounded-md cursor-pointer flex justify-center items-center bg-slate-100 text-red-500 focus:brightness-110 hover:brightness-110 transition"
            onClick={() => todo.id && handleDelete(todo.id)}
          >
            <FaTrash />
          </button>
        </article>
      );
    });
  }

  return (
    <main className="m-auto max-w-7xl bg-slate-200 px-4 py-8 rounded-md shadow-md">
      <Toaster toastOptions={{ position: "top-center" }} />
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
