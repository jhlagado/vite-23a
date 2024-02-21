import { StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Middleware, mutate, SWRConfig } from "swr";
import "@fontsource-variable/montserrat";
import "./index.css";

import ErrorPage from "./error-page";
import Index from "./routes";
import Root from "./routes/root";
import ViewContact from "./routes/view";
import EditContact from "./routes/edit";
import { Experiments } from "./routes/experiments";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "contacts/:contactId",
              element: <ViewContact />,
            },
            {
              path: "contacts/:contactId/edit",
              element: <EditContact />,
            },
            {
              path: "experiments",
              element: <Experiments />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/vite-23a/",
  }
);

const liveQueries = new Set();

export const revalidateLiveQueries = async () => {
  return Promise.all(
    [...liveQueries.values()].map((key) => mutate(key as string))
  );
};

const trackLiveQueries: Middleware = (useSWRNext) => (key, fetcher, config) => {
  useEffect(() => {
    liveQueries.add(key as string);
    return () => {
      liveQueries.delete(key);
    };
  }, [key]);
  return useSWRNext(key, fetcher, config);
};

const FallbackProgress = () => <div>Loading...</div>;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        fetcher: (input, init?) => fetch(input, init).then((res) => res.json()),
        use: [trackLiveQueries],
        suspense: true,
      }}
    >
      <Suspense fallback={<FallbackProgress />}>
        <RouterProvider router={router} />
      </Suspense>
    </SWRConfig>
  </StrictMode>
);
