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

const Panel = ({
  panelTitle,
  entries = [],
  style = {
    p: 3,
    mb: 4,
    elevation: 5,
  },
  square = false,
}) => {
  return (
    <Box>
      <Typography variant="h5" mb={1}>
        {panelTitle}
      </Typography>
      <Paper
        sx={{ ...style, overflow: "auto" }}
        square={square}
        elevation={style.elevation}
      >
        <List>
          {entries.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText primary={entry} />
            </ListItem>
          ))}
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
};

export default Panel;
