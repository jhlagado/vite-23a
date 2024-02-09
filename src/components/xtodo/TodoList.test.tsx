import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { TodoList } from "./TodoList";
import { SERVER_URL } from "./api";
import { mockTodo } from "../../test/mocks/constants";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // Deprecated
    removeListener: vitest.fn(), // Deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

describe("TodoList", () => {
  it("should add a new todo", async () => {
    server.use(
      http.get(
        `${SERVER_URL}`,
        () => {
          console.log(">>>>>>> listing 1");
          return HttpResponse.json(
            [
              {
                userId: 1,
                title: "Wave hello! 👋",
                completed: false,
                id: 1,
              },
            ],
            {
              status: 200,
            }
          );
        },
        { once: true }
      ),
      http.post(`${SERVER_URL}`, () => {
        console.log(">>>>>>> adding");
        return HttpResponse.json(
          {
            userId: 2,
            title: "Get Coffee ☕☕☕",
            completed: false,
            id: 2,
          },
          { status: 200 }
        );
      })
    );

    const res = render(<TodoList />); // ARRANGE

    const input = screen.getByPlaceholderText("Enter new todo");
    await userEvent.type(input, "Get Coffee ☕☕☕");
    expect(input).toHaveValue("Get Coffee ☕☕☕"); // ASSERT

    const button = screen.getByLabelText("Submit");
    await userEvent.click(button);
    expect(input).toHaveValue(""); // ASSERT
    const data = await screen.findByText("Get Coffee ☕☕☕");
    expect(data).toBeInTheDocument();
  });

  // it("should not add a new todo if the request fails", async () => {
  //   server.use(
  //     http.post("/todos", () => {
  //       return new HttpResponse(null, { status: 400 });
  //     })
  //   );
  //   render(<TodoList />); // ARRANGE

  //   // ACT
  //   const input = screen.getByPlaceholderText("Enter new todo");
  //   await userEvent.type(input, "My new todo");
  //   expect(input).toHaveValue("My new todo"); // ASSERT

  //   // ACT
  //   const button = screen.getByLabelText("Submit");
  //   await userEvent.click(button);
  //   waitFor(() => {
  //     expect(input).toHaveValue(""); // ASSERT
  //   });

  //   const data = await screen.queryByText("My new todo");
  //   expect(data).not.toBeInTheDocument;
  // });

  // it("should update a todo", async () => {
  //   render(<TodoList />); // ARRANGE

  //   // ACT
  //   const checkboxArray = (await screen.findAllByRole(
  //     "checkbox"
  //   )) as HTMLInputElement[];
  //   const checkbox = checkboxArray[0];
  //   expect(checkbox.checked).toBeFalsy();
  //   await userEvent.click(checkbox);
  //   waitFor(() => {
  //     expect(checkbox.checked).toBeTruthy(); // ASSERT
  //   });
  // });

  // it("should not update a todo if request fails", async () => {
  //   render(<TodoList />); // ARRANGE

  //   // ACT
  //   const checkboxArray = (await screen.findAllByRole(
  //     "checkbox"
  //   )) as HTMLInputElement[];
  //   const checkbox = checkboxArray[0];
  //   expect(checkbox.checked).toBeFalsy();
  //   server.use(
  //     http.put(`/todos/${checkbox.id}`, () => {
  //       return new HttpResponse(null, { status: 400 });
  //     })
  //   );
  //   await userEvent.click(checkbox);
  //   waitFor(() => {
  //     expect(checkbox.checked).toBeTruthy(); // ASSERT
  //   });
  // });

  // it("should delete a todo", async () => {
  //   render(<TodoList />); // ARRANGE

  //   const todoText = await screen.findByText("Write Code 💻");
  //   expect(todoText).toBeInTheDocument(); // ASSERT

  //   // ACT
  //   const buttons = await screen.findAllByTestId("delete-button");
  //   const button = buttons[0];
  //   await userEvent.click(button);

  //   expect(todoText).not.toBeInTheDocument(); // ASSERT
  // });

  // it("should not delete a todo if request fails", async () => {
  //   render(<TodoList />); // ARRANGE

  //   const checkboxArray = (await screen.findAllByRole(
  //     "checkbox"
  //   )) as HTMLInputElement[];
  //   const checkbox = checkboxArray[0];
  //   expect(checkbox).toBeInTheDocument();

  //   server.use(
  //     http.delete(`/todos/${checkbox.id}`, () => {
  //       return new HttpResponse(null, { status: 400 });
  //     })
  //   );

  //   // ACT
  //   const buttons = await screen.findAllByTestId("delete-button");
  //   const button = buttons[0];
  //   await userEvent.click(button);

  //   const todoText = await screen.findByText("Write Code 💻");
  //   expect(todoText).toBeInTheDocument(); // ASSERT
  // });
});
