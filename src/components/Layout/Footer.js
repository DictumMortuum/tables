import React from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from "@mui/material";

const Component = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: theme.palette.primary.main,
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        marginTop: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle2">
              {`${new Date().getFullYear()} | Dimitris Raviolos`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Component;
