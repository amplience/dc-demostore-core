import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import React, { FC } from "react";


declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}


const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#d54d4d",
    },
    background: {
      default: "#fff",
    },
    grey: {
      A100: "#333333",
    },
    text: {
      primary: "#333333",
    },
    divider: "#d5d5d5",
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    h1: {
      fontSize: "40px",
      color: "#666",
      lineHeight: "44px",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h2: {
      fontSize: "24px",
      color: "#666",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h3: {
      fontSize: "18px",
      color: "#231f20",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontSize: "18px",
      color: "#231f20",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    h5: {
      fontSize: "12px",
      color: "#999",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    h6: {
      fontSize: "11px",
      color: "#231f20",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "14px",
      color: "#231f20",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "16px",
      color: "#231f20",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    body1: {},
    body2: {
      fontSize: "13px",
      color: "#666",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    button: {
      fontSize: "13px",
      color: "#fff",
      backgroundColor: "#999",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
    },
    caption: {
      fontSize: "13px",
      color: "#666",
      fontFamily: "'Roboto Condensed', sans-serif",
      fontWeight: 400,
      fontStyle: "italic",
    },
  },
})

const WithTheme: FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default WithTheme;
