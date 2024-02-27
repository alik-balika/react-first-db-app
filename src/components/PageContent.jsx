import React, { useState } from "react";
import { clearDB, loadDB } from "../customer";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Panel from "./Panel";

// temporary to display logPanel
const logEntries = [
  { message: "Log entry 1" },
  { message: "Log entry 2" },
  { message: "Log entry 3" },
  { message: "Log entry 4" },
  { message: "Log entry 5" },
  { message: "Log entry 6" },
  { message: "Log entry 7" },
  { message: "Log entry 8" },
  { message: "Log entry 9" },
];

const PageContent = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

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
        <Button onClick={() => loadDB(addNotification)}>Load DB</Button>
        <Button>Query DB</Button>
        <Button>Clear DB</Button>
      </ButtonGroup>
      <Box mt={2}>
        <Panel panelTitle="Notifications" entries={notifications} />
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
