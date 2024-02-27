import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";

const Panel = ({
  panelTitle,
  entries = [],
  style = {
    p: 1,
    mb: 4,
    elevation: 5,
  },
  square = false,
  clear,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" mb={1}>
          {panelTitle}
        </Typography>
        <Button onClick={clear}>Clear</Button>
      </Box>
      <Paper
        sx={{ ...style, overflow: "auto", maxHeight: 300 }}
        square={square}
        elevation={style.elevation}
      >
        <List>
          {entries.length ? (
            entries.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={entry.message}
                  secondary={entry.time}
                  secondaryTypographyProps={{ sx: { color: "green" } }}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No entries found."></ListItemText>
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

Panel.propTypes = {
  panelTitle: PropTypes.string.isRequired,
  entries: PropTypes.array,
  style: PropTypes.object,
  square: PropTypes.bool,
  clear: PropTypes.func.isRequired,
};

export default Panel;
