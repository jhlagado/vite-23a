// import { HttpResponse, http } from "msw";
// import { SERVER_URL, Todo } from "../../components/xtodo/todosApi";

export const handlers = [
  // http.get(`${SERVER_URL}`, () => {
  //   return HttpResponse.json(
  //     [
  //       {
  //         userId: 1,
  //         title: "Wave hello! 👋",
  //         completed: false,
  //         id: 1,
  //       },
  //       {
  //         userId: 1,
  //         title: "Get Coffee ☕☕☕",
  //         completed: false,
  //         id: 2,
  //       },
  //       {
  //         userId: 1,
  //         title: "Go to Work ⚒",
  //         completed: false,
  //         id: 3,
  //       },
  //       {
  //         userId: 1,
  //         title: "Write Code 💻",
  //         completed: false,
  //         id: 4,
  //       },
  //     ],
  //     { status: 200 }
  //   );
  // }),
  // http.post(`${SERVER_URL}`, async ({ request }) => {
  //   const { title } = (await request.json()) as Todo;
  //   return HttpResponse.json(
  //     {
  //       userId: 1,
  //       title,
  //       completed: false,
  //       id: 5,
  //     },
  //     { status: 200 }
  //   );
  // }),
  // http.put(`${SERVER_URL}/:id`, async ({ request }) => {
  //   const { id, userId, title, completed } = (await request.json()) as Todo;

  //   return HttpResponse.json(
  //     {
  //       userId,
  //       title,
  //       completed,
  //       id,
  //     },
  //     { status: 200 }
  //   );
  // }),
  // http.delete(`${SERVER_URL}/:id`, ({ params }) => {
  //   const { id } = params;
  //   return HttpResponse.json(
  //     {
  //       id: Number(id),
  //     },
  //     { status: 200 }
  //   );
  // }),
];
