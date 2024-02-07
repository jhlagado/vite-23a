import { addTodo, updateTodo, deleteTodo, Todo } from "./todosAPI";

export const addMutation = async (newTodo: Todo, todos: Todo[]) => {
  const added = await addTodo(newTodo);
  return [added, ...todos].sort((a, b) => b.id - a.id);
};

// type MutatorOptions<Data = any, MutationData = Data> = {
//   revalidate?: boolean;
//   populateCache?:
//     | boolean
//     | ((result: MutationData, currentData: Data | undefined) => Data);
//   optimisticData?:
//     | Data
//     | ((
//         currentData: Data | undefined,
//         displayedData: Data | undefined
//       ) => Data);
//   rollbackOnError?: boolean | ((error: unknown) => boolean);
//   throwOnError?: boolean;
// };

export const addTodoOptions = (newTodo: Todo) => {
  newTodo;
  return {
    optimisticData: (todos: Todo[] = []): Todo[] => {
      console.log("optimisticData", { todos });
      return [newTodo, ...todos].sort((a, b) => b.id - a.id);
    },
    // populateCache: (todos: Todo[] = []) => {
    //   console.log("populateCache", { todos });
    //   return [...todos, newTodo];
    //   //   .sort((a, b) => b.id - a.id);
    // },
    rollbackOnError: true,
    revalidate: false,
  };
};

export const updateMutation = async (updatedTodo: Todo, todos: Todo[]) => {
  const updated = await updateTodo(updatedTodo);
  const prevTodos = todos.filter((todo) => {
    return todo.id !== updatedTodo.id;
  });
  return [...prevTodos, updated].sort((a, b) => b.id - a.id);
};

export const updateTodoOptions = (updatedTodo: Todo) => {
  return {
    optimisticData: (todos: Todo[] = []) => {
      const prevTodos = todos.filter((todo) => {
        return todo.id !== updatedTodo.id;
      });
      return [...prevTodos, updatedTodo].sort((a, b) => b.id - a.id);
    },
    rollbackOnError: true,
    // populateCache: (updated: Todo, todos: Todo[]) => {
    //   const prevTodos = todos.filter((todo) => {
    //     return todo.id !== updatedTodo.id;
    //   });
    //   return [...prevTodos, updated].sort((a, b) => b.id - a.id);
    // },
    revalidate: false,
  };
};

export const deleteMutation = async (id: number, todos: Todo[]) => {
  await deleteTodo(id);
  return todos.filter((todo) => {
    return todo.id !== id;
  });
};

export const deleteTodoOptions = (id: number) => {
  return {
    optimisticData: (todos: Todo[] = []) => {
      return todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    rollbackOnError: true,
    // populateCache: (_: Todo, todos: Todo[]) => {
    //   return todos.filter((todo) => {
    //     return todo.id !== id;
    //   });
    // },
    revalidate: false,
  };
};
