import React from "react";
import { clearDB, loadDB } from "../customer";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Panel from "./Panel";

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
      <Box mt={2}>
        <Panel panelTitle="Notifications" />
        <Panel panelTitle="Results" />
        <Panel
          panelTitle="Logs"
          entries={logEntries}
          style={{
            maxHeight: 300,
            bgcolor: "black",
            color: "white",
          }}
          square={true}
        />
      </Box>
    </Box>
  );
};

export default PageContent;
