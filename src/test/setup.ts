import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // Deprecated
    removeListener: vitest.fn(), // Deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

