import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import { TodoList } from "./TodoList";
import { SERVER_URL } from "./api";

describe("TodoList", () => {
  it("should add a new todo", async () => {
    server.use(
      http.get(
        `${SERVER_URL}`,
        () => {
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

    render(<TodoList />);

    const input = screen.getByPlaceholderText("Enter new todo");
    await userEvent.type(input, "Get Coffee ☕☕☕");
    expect(input).toHaveValue("Get Coffee ☕☕☕");

    const button = screen.getByLabelText("Submit");
    await userEvent.click(button);
    expect(input).toHaveValue("");
    const data = await screen.findByText("Get Coffee ☕☕☕");
    expect(data).toBeInTheDocument();
  });

  it("should not add a new todo if the request fails", async () => {
    server.use(
      http.post(`${SERVER_URL}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    render(<TodoList />);

    const input = screen.getByPlaceholderText("Enter new todo");
    await userEvent.type(input, "My new todo");
    expect(input).toHaveValue("My new todo");

    const button = screen.getByLabelText("Submit");
    await userEvent.click(button);
    expect(input).toHaveValue("");

    const data = await screen.queryByText("My new todo");
    expect(data).not.toBeInTheDocument;
  });

  it("should update a todo", async () => {
    render(<TodoList />);

    const checkboxArray = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[];

    const checkbox = checkboxArray[0];
    expect(checkbox.checked).toBeFalsy();
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
  });

  it("should delete a todo", async () => {
    render(<TodoList />);

    const todoText = await screen.findByText("Get Coffee ☕☕☕");
    expect(todoText).toBeInTheDocument();

    const buttons = await screen.findAllByTestId("delete-button");
    const button = buttons[0];
    await userEvent.click(button);

    expect(todoText).not.toBeInTheDocument();
  });

  it("should not delete a todo if request fails", async () => {
    render(<TodoList />);

    const checkboxArray = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[];
    const checkbox = checkboxArray[0];
    expect(checkbox).toBeInTheDocument();

    server.use(
      http.delete(`${SERVER_URL}/${checkbox.id}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    const buttons = await screen.findAllByTestId("delete-button");
    const button = buttons[0];
    await userEvent.click(button);

    const todoText = await screen.findByText("Get Coffee ☕☕☕");
    expect(todoText).toBeInTheDocument();
  });
});
