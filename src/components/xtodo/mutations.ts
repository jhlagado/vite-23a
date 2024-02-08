import { Todo, addTodo, deleteTodo, updateTodo } from "./todosApi";

export async function addTodoMutation(newTodo: Todo, todos: Todo[]) {
  const added = await addTodo(newTodo);
  return [added, ...todos];
}

export function addTodoMutationOptions(newTodo: Todo, todos: Todo[]) {
  return {
    optimisticData: [newTodo, ...todos],
    revalidate: false,
  };
}

export async function updateTodoMutation(updatedTodo: Todo, todos: Todo[]) {
  const updated = await updateTodo(updatedTodo);
  return todos.map((todo) => {
    return updatedTodo.id === todo.id ? updated : todo;
  });
}

export function updateTodoMutationOptions(updatedTodo: Todo, todos: Todo[]) {
  return {
    optimisticData: todos.map((todo) => {
      return updatedTodo.id === todo.id ? updatedTodo : todo;
    }),
    revalidate: false,
  };
}

export async function deleteTodoMutation(id: number, todos: Todo[]) {
  await deleteTodo(id);
  return todos.filter((todo) => {
    return todo.id !== id;
  });
}

export function deleteTodoMutationOptions(id: number, todos: Todo[]) {
  return {
    optimisticData: todos.filter((todo) => {
      return todo.id !== id;
    }),
    revalidate: false,
  };
}
