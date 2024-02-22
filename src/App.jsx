import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import React from "react";

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
        {/* Page Header */}
        {/* Page Content */}
      </ThemeProvider>
    </Box>
  );
};

export default App;
