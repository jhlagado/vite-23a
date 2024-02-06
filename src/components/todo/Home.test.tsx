import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";

describe("Home", () => {
  it("should add a new todo", async () => {
    render(<Home />); // ARRANGE

    // ACT
    const input = screen.getByPlaceholderText("New Todo");
    await userEvent.type(input, "My new todo");
    expect(input).toHaveValue("My new todo"); // ASSERT

    // ACT
    const button = screen.getByRole("button", {
      name: "Submit",
    });
    await userEvent.click(button);
    waitFor(() => {
      expect(input).toHaveValue(""); // ASSERT
    });

    const data = await screen.findByText("My new todo");
    expect(data).toHaveTextContent("My new todo");
  });

  it("should not add a new todo if the request fails", async () => {
    server.use(
      http.post("/todos", () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    render(<Home />); // ARRANGE

    // ACT
    const input = screen.getByPlaceholderText("New Todo");
    await userEvent.type(input, "My new todo");
    expect(input).toHaveValue("My new todo"); // ASSERT

    // ACT
    const button = screen.getByRole("button", {
      name: "Submit",
    });
    await userEvent.click(button);
    waitFor(() => {
      expect(input).toHaveValue(""); // ASSERT
    });

    const data = await screen.queryByText("My new todo");
    expect(data).not.toBeInTheDocument;
  });

  it("should update a todo", async () => {
    render(<Home />); // ARRANGE

    // ACT
    const checkboxArray = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[];
    const checkbox = checkboxArray[0];
    expect(checkbox.checked).toBeFalsy();
    await userEvent.click(checkbox);
    waitFor(() => {
      expect(checkbox.checked).toBeTruthy(); // ASSERT
    });
  });

  it("should not update a todo if request fails", async () => {
    render(<Home />); // ARRANGE

    // ACT
    const checkboxArray = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[];
    const checkbox = checkboxArray[0];
    expect(checkbox.checked).toBeFalsy();
    server.use(
      http.put(`/todos/${checkbox.id}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );
    await userEvent.click(checkbox);
    waitFor(() => {
      expect(checkbox.checked).toBeTruthy(); // ASSERT
    });
  });

  it("should delete a todo", async () => {
    render(<Home />); // ARRANGE

    const todoText = await screen.findByText("Write Code 💻");
    expect(todoText).toBeInTheDocument(); // ASSERT

    // ACT
    const buttons = await screen.findAllByTestId("delete-button");
    const button = buttons[0];
    await userEvent.click(button);

    expect(todoText).not.toBeInTheDocument(); // ASSERT
  });

  it("should not delete a todo if request fails", async () => {
    render(<Home />); // ARRANGE

    const checkboxArray = (await screen.findAllByRole(
      "checkbox"
    )) as HTMLInputElement[];
    const checkbox = checkboxArray[0];
    expect(checkbox).toBeInTheDocument();

    server.use(
      http.delete(`/todos/${checkbox.id}`, () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    // ACT
    const buttons = await screen.findAllByTestId("delete-button");
    const button = buttons[0];
    await userEvent.click(button);

    const todoText = await screen.findByText("Write Code 💻");
    expect(todoText).toBeInTheDocument(); // ASSERT
  });
});
