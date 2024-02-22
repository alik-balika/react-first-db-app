import React from "react";
import { clearDB, loadDB } from "../customer";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import LogPanel from "./LogPanel";

// temporary to display logPanel
const logEntries = [
  "Log entry 1",
  "Log entry 2",
  "Log entry 3",
  "Log entry 1",
  "Log entry 2",
  "Log entry 3",
  "Log entry 1",
  "Log entry 2",
  "Log entry 3",
  "Log entry 1",
  "Log entry 2",
  "Log entry 3",
];

const PageContent = () => {
  return (
    <Box
      sx={{
        m: 8,
        p: 4,
        backgroundColor: "#eee",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" mb={1}>
        Control Panel
      </Typography>
      <ButtonGroup variant="contained">
        <Button>Load DB</Button>
        <Button>Query DB</Button>
        <Button>Clear DB</Button>
      </ButtonGroup>
      {/* Potentially extract notifications to its own notification panel component */}
      <Paper
        elevation={5}
        sx={{
          p: 3,
          my: 4,
        }}
      >
        <Typography variant="h5">Notifications</Typography>
      </Paper>
      <LogPanel logEntries={logEntries} />
    </Box>
  );
};

export default PageContent;
