import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
import { Todo, SERVER_URL as cacheKey, getTodos } from "./api";
import {
  addTodoMutation,
  addTodoUtility,
  deleteTodoMutation,
  deleteTodoUtility,
  updateTodoMutation,
  updateTodoUtility,
} from "./mutations";

import { AddTodo } from "./AddTodo";
import { TodoListItems } from "./TodoListItems";

export const TodoList = () => {
  const { isLoading, error, data: todos, mutate } = useSWR(cacheKey, getTodos);

  const handleAdd = async (addedTodo: Todo) => {
    if (!todos) return;
    try {
      await mutate(addTodoMutation(addedTodo, todos), {
        optimisticData: addTodoUtility(addedTodo, todos),
        revalidate: false,
      });
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
      await mutate(updateTodoMutation(updatedTodo, todos), {
        optimisticData: updateTodoUtility(updatedTodo, todos),
      });
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
      await mutate(deleteTodoMutation(id, todos), {
        optimisticData: deleteTodoUtility(id, todos),
        revalidate: false,
      });
      toast.success("Success! Deleted item", {
        duration: 2000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to delete item", { duration: 2000 });
    }
  };

  const handleSubmit = (newTodo: string) => {
    handleAdd({
      userId: 1,
      title: newTodo,
      completed: false,
      id: 9999, // ignored
    });
  };

  return (
    <main className="m-auto bg-slate-200 px-4 py-8 rounded-md shadow-md">
      <Toaster toastOptions={{ position: "top-center" }} />
      <h1>Todo List</h1>
      <AddTodo handleSubmit={handleSubmit} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!isLoading && !error && (
        <TodoListItems
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};
