import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App, { TODOS_URL } from "./App";
import { server } from "./test/mocks/server";
import { HttpResponse, http } from "msw";

afterEach(() => {
  cleanup();
});

it("testing the app text", () => {
  render(<App />);
  const text = screen.getByText("Vite + React");
  expect(text).toBeInTheDocument();
});

it("it should increment the count on click", async () => {
  render(<App />);
  const button = screen.getByRole("button");
  await userEvent.click(button);
  // res.debug();
  const text = await screen.findByText(/count is 1/i);
  expect(text).toBeInTheDocument();
});

it("api success scenario", async () => {
  render(<App />);
  const text = await screen.findByText("Todo list: 1");
  expect(text).toBeInTheDocument();
});

it("api error scenario", () => {
  render(<App />);
  server.use(
    http.get(TODOS_URL, () => {
      return new HttpResponse(null, { status: 401 });
    })
  );
  expect(screen.queryByText("Todo list")).not.toBeInTheDocument();
});
