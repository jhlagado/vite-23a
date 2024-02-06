export const SERVER_URL = "http://localhost:3500/todos";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(SERVER_URL);
  return await response.json();
};

export const addTodo = async ({
  id,
  title,
  completed,
  userId,
}: Todo): Promise<Todo> => {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify({
      id,
      title,
      completed,
      userId,
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

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
