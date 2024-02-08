// import { mutate } from "swr";
// import { addTodo, updateTodo, deleteTodo, Todo } from "./todosApi";

// export const addTodoMutation = async (newTodo: Todo, todos: Todo[]) => {
//   return mutate(addTodo(newTodo), {
//     optimisticData: [newTodo, ...todos],
//     revalidate: false,
//   });
// };

// export const updateMutation = async (updatedTodo: Todo, todos: Todo[]) => {
//   const updated = await updateTodo(updatedTodo);
//   const prevTodos = todos.filter((todo) => {
//     return todo.id !== updatedTodo.id;
//   });
//   return [...prevTodos, updated].sort((a, b) => b.id - a.id);
// };

// export const updateTodoOptions = (updatedTodo: Todo) => {
//   return {
//     optimisticData: (todos: Todo[] = []) => {
//       const prevTodos = todos.filter((todo) => {
//         return todo.id !== updatedTodo.id;
//       });
//       return [...prevTodos, updatedTodo].sort((a, b) => b.id - a.id);
//     },
//     revalidate: false,
//   };
// };

// export const deleteMutation = async (id: number, todos: Todo[]) => {
//   await deleteTodo(id);
//   return todos.filter((todo) => {
//     return todo.id !== id;
//   });
// };

// export const deleteTodoOptions = (id: number) => {
//   return {
//     optimisticData: (todos: Todo[] = []) => {
//       return todos.filter((todo) => {
//         return todo.id !== id;
//       });
//     },
//     revalidate: false,
//   };
// };
