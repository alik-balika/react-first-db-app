import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import PageHeader from "./components/PageHeader";
import PageContent from "./components/PageContent";

const theme = createTheme({
  primary: {
    main: "",
  },
  secondary: {
    main: "",
  },
});

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <PageHeader />
        <PageContent />
      </ThemeProvider>
    </Box>
  );
};

export default App;
