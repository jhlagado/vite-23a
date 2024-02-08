import { Todo, addTodo, deleteTodo, updateTodo } from "./todosApi";

export const addTodoUtility = (added: Todo, todos: Todo[]) => {
  return [added, ...todos];
};

export async function addTodoMutation(addedTodo: Todo, todos: Todo[]) {
  const added = await addTodo(addedTodo);
  return addTodoUtility(added, todos);
}

export const updateTodoUtility = (updated: Todo, todos: Todo[]) => {
  return todos.map((todo) => {
    return updated.id === todo.id ? updated : todo;
  });
};

export async function updateTodoMutation(updatedTodo: Todo, todos: Todo[]) {
  const response = await updateTodo(updatedTodo);
  return updateTodoUtility(response, todos);
}

export const deleteTodoUtility = (id: number, todos: Todo[]) => {
  return todos.filter((todo) => {
    return todo.id !== id;
  });
};

export async function deleteTodoMutation(id: number, todos: Todo[]) {
  await deleteTodo(id);
  return deleteTodoUtility(id, todos);
}

