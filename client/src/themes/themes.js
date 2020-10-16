import React from "react";
import { theme } from "@chakra-ui/core";

const customIcons = {
  book: {
    path: (
      <g fill="currentColor">
        <path d="m424 0h-286c-36.393 0-66 29.607-66 66v374c0 39.701 32.299 72 72 72h280c8.837 0 16-7.164 16-16s-7.163-16-16-16h-280c-22.056 0-40-17.944-40-40s17.944-40 40-40h280c8.837 0 16-7.164 16-16v-368c0-8.836-7.163-16-16-16zm-320 371.431v-305.431c0-18.778 15.222-34 34-34h1c2.761 0 5 2.239 5 5v326.164c0 2.615-2.013 4.816-4.622 4.983-10.085.643-19.611 3.373-28.152 7.76-3.303 1.696-7.226-.764-7.226-4.476z" />
        <path d="m424 424h-280c-8.837 0-16 7.164-16 16s7.163 16 16 16h280c8.837 0 16-7.164 16-16s-7.163-16-16-16z" />
      </g>
    ),
    viewBox: "0 0 512 512",
  },
};

export default {
  ...theme,
  fonts: {
    heading: "Annie Use Your Telescope, fantasy",
    body: "Cabin, sans-serif",
  },
  colors: {
    ...theme.colors,
    purple: {
      50: "#f6edfb",
      100: "#dbcfe4",
      200: "#c2b0ce",
      300: "#a991ba",
      400: "#8f72a5",
      500: "#76598c",
      600: "#5c446d",
      700: "#42314f",
      800: "#291d30",
      900: "#0f0815",
    },
    burgandy: {
      50: "#ffecf5",
      100: "#e6ced8",
      200: "#d0b0be",
      300: "#bb91a2",
      400: "#a67288",
      500: "#8d596e",
      600: "#6f4456",
      700: "#50303d",
      800: "#321c26",
      900: "#19060d",
    },
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
  fontSizes: {
    xs: "1rem",
    sm: "1.25rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "3.75rem",
    "4xl": "4.5rem",
    "5xl": "6rem",
    "6xl": "8rem",
  },
};
