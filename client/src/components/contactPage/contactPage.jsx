// src/components/ContactInfo.js

import React from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";

const ContactInfo = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, width: "80%" }}>
        <Typography variant="h4" gutterBottom>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">Address:</Typography>
              <Typography>
                123 Amazon Street,
                <br />
                Seattle, WA 98109
                <br />
                United States
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Phone:</Typography>
              <Typography>(123) 456-7890</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Email:</Typography>
              <Typography>contact@amazon.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ContactInfo;
