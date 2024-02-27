import React, { useState } from "react";
import { clearDB, loadDB, queryDB } from "../customer";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Panel from "./Panel";

const PageContent = () => {
  const [notifications, setNotifications] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [results, setResults] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const addLog = (logEntry) => {
    setLogEntries((prevLogEntries) => [...prevLogEntries, logEntry]);
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
        <Button onClick={() => loadDB(addNotification, addLog)}>Load DB</Button>
        <Button onClick={() => queryDB(addNotification, addLog, setResults)}>
          Query DB
        </Button>
        <Button>Clear DB</Button>
      </ButtonGroup>
      <Box mt={2}>
        <Panel panelTitle="Notifications" entries={notifications} />
        <Panel panelTitle="Results" entries={results} />
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
