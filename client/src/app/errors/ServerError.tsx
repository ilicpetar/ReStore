import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();
  const location: any = useLocation();

  const state = location.state;

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>Go back to the store</Button>
    </Container>
  );
};

export default ServerError;
