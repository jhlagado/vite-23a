import { HttpResponse, http } from "msw";
import { TODOS_URL } from "../../App";

export const handlers = [
  http.get(TODOS_URL, () => {
    return HttpResponse.json(
      {
        todos: [
          {
            id: 1,
            todo: "Do something nice for someone I care about",
            completed: true,
            userId: 26,
          },
        ],
      },
      { status: 200 }
    );
  }),
];
