import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { SERVER_URL, getTodos } from "./todosApi";

describe("getTodos", () => {

  it("should return the correct number of todo items", async () => {
    server.use(
      http.get(`${SERVER_URL}`, () => {
        return HttpResponse.json(
          [
            {
              userId: 1,
              title: "Wave hello! 👋",
              completed: false,
              id: 1,
            },
            {
              userId: 1,
              title: "Get Coffee ☕☕☕",
              completed: false,
              id: 2,
            },
          ],
          { status: 200 }
        );
      })
    );
    const todosArray = await getTodos();
    expect(todosArray.length).toBe(2);
  });

  it("should return an empty array with an error", async () => {
    server.use(
      http.get(`${SERVER_URL}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    try {
      await getTodos();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Unexpected end of JSON input");
      }
    }
  });
});
