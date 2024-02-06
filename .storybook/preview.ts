import type { Preview } from "@storybook/react";
import "../src/index.css";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    docs: { theme: themes.dark },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
