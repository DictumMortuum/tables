import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Component = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "black",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginTop: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | Dimitris Raviolos`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Component;
