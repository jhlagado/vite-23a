import { cleanup, render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { server } from "../../test/mocks/server";
import UserList, { SERVER_URL } from "./UserList";

const mockUsers = [
  {
    id: 1,
    firstName: "Terry",
    lastName: "Medhurst",
    maidenName: "Smitham",
    age: 50,
    gender: "male",
    email: "atuny0@sohu.com",
    phone: "+63 791 675 8914",
    username: "atuny0",
  },
  {
    id: 2,
    firstName: "Sheldon",
    lastName: "Quigley",
    maidenName: "Cole",
    age: 28,
    gender: "male",
    email: "hbingley1@plala.or.jp",
    phone: "+7 813 117 7139",
    username: "hbingley1",
  },
];

afterEach(() => {
  cleanup();
});

it("api success scenario", async () => {
  server.use(
    http.get(SERVER_URL, () => {
      return HttpResponse.json({ users: mockUsers }, { status: 200 });
    })
  );
  render(<UserList />);
  const items = await screen.findAllByRole("listitem");
  expect(items.length).toBe(2);
});

it("api error scenario", () => {
  server.use(
    http.get(SERVER_URL, () => {
      return HttpResponse.json(null, { status: 401 });
    })
  );
  render(<UserList />);
  const items = screen.queryAllByRole("listitem");
  expect(items.length).toBe(0);
});
