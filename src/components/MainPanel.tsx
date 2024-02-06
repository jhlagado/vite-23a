import { useState, useEffect } from "react";
import TodoList from "./xtodo/TodoList";

export const TODOS_URL = "https://dummyjson.com/todos";

export default function MainPanel() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(TODOS_URL)
      .then(async (res) => await res.json())
      .then((res) => {
        setTodos(res.todos);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="p-4">
      {/* <Home /> */}
      <TodoList />
      <div className="text-green-500">Todo list: {todos.length}</div>
      <label htmlFor="inc">Inc</label>
      <button
        id="inc"
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        count is {count}
      </button>
    </div>
  );
}
