import { useEffect, useState } from "react";
import { type Todo } from "../types/Todo";
import AddTodo from "./AddTodo/AddTodo";
import TodoList from "./TodoList/TodoList";
import fetchTodos from "../lib/fetchTodos/fetchTodos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    async function getTodos() {
      const todos = await fetchTodos();
      if (todos?.length) setTodos(todos);
    }
    getTodos();
  }, []);
  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
}
