import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

const LogPanel = ({ logEntries }) => {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        Logs
      </Typography>
      <Paper
        sx={{
          maxHeight: 300,
          overflow: "auto",
          bgcolor: "black",
          color: "white",
        }}
        square
      >
        <List>
          {logEntries.map((logEntry, index) => (
            <ListItem key={index}>
              <ListItemText primary={logEntry} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

LogPanel.propTypes = {
  logEntries: PropTypes.array.isRequired,
};

export default LogPanel;
