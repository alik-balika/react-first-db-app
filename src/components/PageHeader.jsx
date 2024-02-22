import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const PageHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4">IndexedDB Demo</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
