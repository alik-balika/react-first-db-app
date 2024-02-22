import React from "react";
import { clearDB, loadDB } from "../customer";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";

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
      <Paper
        elevation={5}
        sx={{
          p: 3,
          mt: 4,
        }}
      >
        <Typography variant="h5">Notifications</Typography>
      </Paper>
    </Box>
  );
};

export default PageContent;
