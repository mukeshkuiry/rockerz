import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonSettings: ThemeOptions = {
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "14px",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    primary: {
      main: "#4a90e2",
    },
    secondary: {
      main: "#e0e0e0",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
    divider: "#e0e0e0",
  },
});

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#2e2e2e",
    },
    primary: {
      main: "#4e9af1",
    },
    secondary: {
      main: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbb",
    },
    divider: "#444",
  },
});
