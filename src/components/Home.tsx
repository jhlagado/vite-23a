import { useState } from "react"
import { Todo } from "../types/Todo"
import AddTodo from "./AddTodo/AddTodo"
import TodoList from "./TodoList/TodoList"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      "userId": 1,
      "title": "Wave hello! 👋",
      "completed": false,
      "id": 1
    },
    {
      "userId": 1,
      "title": "Get Coffee ☕☕☕",
      "completed": false,
      "id": 2
    },
    {
      "userId": 1,
      "title": "Go to Work ⚒",
      "completed": false,
      "id": 3
    },
    {
      "userId": 1,
      "title": "Write Code 💻",
      "completed": false,
      "id": 4,
    }
  ])

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}