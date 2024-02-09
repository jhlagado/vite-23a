import { TodoList } from "./xtodo/TodoList";

import { preload } from "swr";
import { SERVER_URL as cacheKey, getTodos } from "./xtodo/api";

preload(cacheKey, getTodos);

export default function MainPanel() {
  return (
    <div className="p-4 bg-white">
      <TodoList />
    </div>
  );
}
