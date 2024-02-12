import SideBar from "./components/SideBar";
import { TodoList } from "./components/xtodo/TodoList";

function App() {
  return (
    <div className="flex size-1.5 bg-slate-500">
      <SideBar />
      <TodoList />
    </div>
  );
}

export default App;

