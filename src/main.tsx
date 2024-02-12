import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@fontsource-variable/montserrat';
import "./index.css";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";

import {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";
import { Resume } from "./routes/resume";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "contacts/:contactId",
              element: <Contact />,
              loader: contactLoader,
              action: contactAction,
            },
            {
              path: "contacts/:contactId/edit",
              element: <EditContact />,
              loader: contactLoader,
              action: editAction,
            },
            {
              path: "contacts/:contactId/destroy",
              action: destroyAction,
            },
            {
              path: "resume",
              element: <Resume />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
