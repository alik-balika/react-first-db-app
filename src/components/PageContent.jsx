import React, { useState } from "react";
import { clearDB, loadDB, queryDB } from "../customer";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Panel from "./Panel";

const PageContent = () => {
  const [notifications, setNotifications] = useState([]);
  const [logEntries, setLogEntries] = useState([]);
  const [results, setResults] = useState([]);
  const [currentButtonPressed, setCurrentButtonPressed] = useState("");

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const addLog = (logEntry) => {
    setLogEntries((prevLogEntries) => [...prevLogEntries, logEntry]);
  };

  const handleLoadDB = () => {
    loadDB(addNotification, addLog);
    setCurrentButtonPressed("loadDB");
  };

  const handleClearDB = () => {
    clearDB(addNotification, addLog);
    setCurrentButtonPressed("clearDB");
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
        <Button
          onClick={handleLoadDB}
          disabled={currentButtonPressed === "loadDB"}
        >
          Load DB
        </Button>
        <Button onClick={() => queryDB(addNotification, addLog, setResults)}>
          Query DB
        </Button>
        <Button
          onClick={handleClearDB}
          disabled={currentButtonPressed === "clearDB"}
        >
          Clear DB
        </Button>
      </ButtonGroup>
      <Box mt={2}>
        <Panel
          panelTitle="Notifications"
          entries={notifications}
          clear={() => setNotifications([])}
        />
        <Panel
          panelTitle="Results"
          entries={results}
          clear={() => setResults([])}
        />
        <Panel
          panelTitle="Logs"
          entries={logEntries}
          style={{
            bgcolor: "black",
            color: "white",
          }}
          square={true}
          clear={() => setLogEntries([])}
        />
      </Box>
    </Box>
  );
};

export default PageContent;
