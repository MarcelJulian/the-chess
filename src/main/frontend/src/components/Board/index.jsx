import React, { useState } from "react";

import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blueGrey, green, blue, brown, deepOrange } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
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
      <Card elevation={3} style={{ height: "100%", width: "100%" }}>
        <Box
          marginLeft="30%"
          border="1px solid"
          borderLeft="1px"
          borderRight="1px"
          borderColor="gray.800"
          sx={{
            justifyContent: "center",
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
      </Card>
    );
  };

  return <Container>{generateBox()}</Container>;
}

export default GBoard;
