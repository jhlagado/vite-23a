import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { SERVER_URL, Todo, updateTodo } from "./todosApi";
import { mockTodo } from "../../test/mocks/constants";

describe("updateTodo", () => {
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
    const updatedTodo = await updateTodo(mockTodo);
    expect(updatedTodo).toEqual(mockTodo);
  });

  it("should fail with an error", async () => {
    server.use(
      http.put(`${SERVER_URL}/1`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    expect.assertions(1);
    try {
      await updateTodo(mockTodo);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Unexpected end of JSON input");
      }
    }
  });
});
