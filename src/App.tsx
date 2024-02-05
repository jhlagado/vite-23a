import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export const TODOS_URL = "https://dummyjson.com/todos";

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(TODOS_URL)
      .then((res) => res.json())
      .then((res) => setTodos(res.todos));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {todos.length && <div className="text-green-500">Todo list: {todos.length}</div>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
