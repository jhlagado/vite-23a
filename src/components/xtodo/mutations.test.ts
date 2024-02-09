import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { SERVER_URL, Todo } from "./api";
import { mockTodo, mockTodoList } from "../../test/mocks/constants";
import {
  addTodoMutation,
  deleteTodoMutation,
  updateTodoMutation,
} from "./mutations";

describe("mutations", () => {
  it("should return the added todo item", async () => {
    server.use(
      http.post(`${SERVER_URL}`, () => {
        return HttpResponse.json(mockTodo, { status: 200 });
      })
    );
    const todos = mockTodoList;
    const todos1 = await addTodoMutation(mockTodo, todos);
    expect(todos1).toEqual([mockTodo, ...todos]);
  });

  it("should return the updated todo item", async () => {
    server.use(
      http.put(`${SERVER_URL}/:id`, async ({ request }) => {
        const { id, userId, title, completed } = (await request.json()) as Todo;
        return HttpResponse.json(
          {
            userId,
            title,
            completed,
            id,
          },
          { status: 200 }
        );
      })
    );
    const todos = [mockTodo, ...mockTodoList];
    const todos1 = await updateTodoMutation(
      { ...mockTodo, title: "123" },
      todos
    );
    expect(todos1).toEqual([{ ...mockTodo, title: "123" }, ...mockTodoList]);
  });

  it("should return the deleted todo id", async () => {
    server.use(
      http.delete(`${SERVER_URL}/:id`, () => {
        return HttpResponse.json(mockTodo, { status: 200 });
      })
    );
    const todos = [mockTodo, ...mockTodoList];
    const todos1 = await deleteTodoMutation(mockTodo.id, todos);
    expect(todos1).toEqual(mockTodoList);
  });
});
