# install vite, vitest,

npm create vite@latest
npm i -D vitest
npm i -D msw

package.json

```
"scripts:{
    "test": "vitest --coverage"
}
```

npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom

vite.config.ts

```
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

tsconfig.json

```
{
    "compilerOptions": {
        "types": [
            "vitest/globals"
        ],
    },
    "include": [
        "src",
        "src/test/setup.ts"
    ],
}
```

src/test/setup.ts

```
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
```

src/test/mocks/handlers.ts

```
import { HttpResponse, http } from "msw";
import { SERVER_URL } from "../../constants";

export const handlers = [
  http.get(SERVER_URL, () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          todo: "Do something nice for someone I care about",
          completed: true,
          userId: 26,
        },
      ],
      { status: 200 }
    );
  }),
];

```

src/test/mocks/server.ts

```
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

```
