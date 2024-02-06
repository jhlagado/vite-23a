import { HttpResponse, http } from "msw";
import { Todo } from "../../types/Todo";
import { TODOS_URL } from "../../components/MainPanel";

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
  http.get("/todos", () => {
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
        {
          userId: 1,
          title: "Go to Work ⚒",
          completed: false,
          id: 3,
        },
        {
          userId: 1,
          title: "Write Code 💻",
          completed: false,
          id: 4,
        },
      ],
      { status: 200 }
    );
  }),
  http.post("/todos", async ({ request }) => {
    const { title } = (await request.json()) as Todo;
    return HttpResponse.json(
      {
        userId: 1,
        title: title,
        completed: false,
        id: 5,
      },
      { status: 200 }
    );
  }),
  http.put("/todos/:id", async ({ request }) => {
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
  }),
  http.delete("/todos/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json(
      {
        id: Number(id),
      },
      { status: 200 }
    );
  }),
];
