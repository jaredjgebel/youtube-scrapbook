import { theme } from "@chakra-ui/core";

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
  },
};
