import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { SERVER_URL, addTodo } from "./todosApi";
import { mockTodo } from "../../test/mocks/constants";

describe("addTodo", () => {

  it("should return the added todo item", async () => {
    server.use(
      http.post(`${SERVER_URL}`, () => {
        return HttpResponse.json(mockTodo, { status: 200 });
      })
    );
    const added = await addTodo(mockTodo);
    expect(added).toEqual(mockTodo);
  });

  it("should fail with an error", async () => {
    server.use(
      http.post(`${SERVER_URL}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    expect.assertions(1);
    try {
      await addTodo(mockTodo);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual("Unexpected end of JSON input");
      }
    }
  });
});
