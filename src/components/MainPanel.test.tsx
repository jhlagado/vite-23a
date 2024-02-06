import { cleanup, render, screen } from "@testing-library/react";
import MainPanel, { TODOS_URL } from "./MainPanel";
import { server } from "../test/mocks/server";
import { HttpResponse, http } from "msw";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

it("should increment the count on click", async () => {
  render(<MainPanel />);
  const button = screen.getByLabelText("Inc");
  await userEvent.click(button);
  const text = await screen.findByText(/count is 1/i);
  expect(text).toBeInTheDocument();
});

it("api success scenario", async () => {
  render(<MainPanel />);
  const text = await screen.findByText("Todo list: 1");
  expect(text).toBeInTheDocument();
});

it("api error scenario", () => {
  server.use(
    http.get(TODOS_URL, () => {
      return new HttpResponse(null, { status: 401 });
    })
  );
  render(<MainPanel />);
  expect(screen.queryByText("Todo list")).not.toBeInTheDocument();
});
