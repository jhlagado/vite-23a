import { HttpResponse, http } from "msw";
import { SERVER_URL } from "../../components/xtodo/api";

export const handlers = [
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
          userId: 2,
          title: "Get Coffee ☕☕☕",
          completed: false,
          id: 2,
        },
      ],
      { status: 200 }
    );
  }),
];
