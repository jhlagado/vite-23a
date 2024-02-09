export const SERVER_URL = "http://localhost:3500/todos";

export type Todo = {
  id?: number;
  title: string;
  completed: boolean;
  userId: number;
  created?: number;
};

// export const delay = (millis = 800) =>
//   new Promise((res: Function) => {
//     setTimeout(() => {
//       res();
//     }, millis);
//   });

export const getTodos = async (): Promise<Todo[]> => {
  // await delay();
  const response = await fetch(`${SERVER_URL}?_sort=-completed,-created`);
  return await response.json();
};

export const addTodo = async ({
  title,
  completed,
  userId,
}: Todo): Promise<Todo> => {
  // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
  const response = await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify({
      title,
      completed,
      userId,
      created: Date.now(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${SERVER_URL}/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
};

export const deleteTodo = async (id: number): Promise<unknown> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
