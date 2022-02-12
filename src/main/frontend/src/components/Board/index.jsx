import React, { useState } from "react";

import { blue, brown, deepOrange } from "@material-ui/core/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blueGrey, green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { height, width } from "@mui/system";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function GBoard() {
  const generateBox = () => {
    const boxes = [];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        boxes.push(
          <Box
            border="1px solid"
            sx={{
              bgcolor: "burlywood"
            }}
          />
        );
        boxes.push(<Box border="1px solid" />);
      }
      for (let i = 0; i < 4; i++) {
        boxes.push(<Box border="1px solid" />);
        boxes.push(
          <Box
            border="1px solid"
            sx={{
              bgcolor: "burlywood"
            }}
          />
        );
      }
    }
    return (
      <Box
        border="1px solid"
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.800"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)",
          width: "30rem",
          height: "30rem"
        }}
        gap={0}
      >
        {boxes}
      </Box>
    );
  };

  return (
    <Paper elevation={3} style={{ height: "100%", width: "100%" }}>
      <Box>
        <Container justifyContent="center">{generateBox()}</Container>
      </Box>
    </Paper>
  );
}

export default GBoard;
