import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { SERVER_URL, deleteTodo } from "./todosApi";
import { mockTodo } from "../../test/mocks/constants";

describe("deleteTodo", () => {

  it("should return the deleted todo id", async () => {
    server.use(
      http.delete(`${SERVER_URL}/:id`, () => {
        return HttpResponse.json(
          mockTodo,
          { status: 200 }
        );
      })
    );
    const deletedTodo = await deleteTodo(1);
    expect(deletedTodo).toEqual(mockTodo);
  });

  it("should fail with an error", async () => {
    server.use(
      http.delete(`${SERVER_URL}/1`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    expect.assertions(1);
    try {
      await deleteTodo(1);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Unexpected end of JSON input");
      }
    }
  });
});
