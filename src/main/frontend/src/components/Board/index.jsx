import React, { useState } from "react";

import CachedIcon from "@mui/icons-material/Cached";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastRewind from "@mui/icons-material/FastRewind";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FlagIcon from "@mui/icons-material/Flag";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      // borderRadius="1rem"
      // boxShadow="3"
      // border="1px solid"
      sx={{
        // p: 2,
        // m: 1,
        // borderRadius: 2,
        fontFamily: "Poppins",
        // marginLeft: "2%",
        // marginRight: "2%",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}

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
      <Card elevation={3}>
        <Box
          border="1px solid"
          borderRadius="1rem"
          justifyContent="center"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)"
          }}
        >
          <Card
            variant="outlined"
            elevation={4}
            style={{
              marginTop: "30%",
              marginLeft: "15%",
              marginBottom: "25%",
              height: "13rem",
              width: "15rem",
              borderRadius: "0.5rem",
              justifyContent: "center"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginTop: "2rem",
                marginBottom: "2rem",
                fontFamily: "Poppins",
                fontSize: "14",
                textAlign: "center"
              }}
            >
              Movement :
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "0.5rem",
                fontFamily: "Poppins",
                textAlign: "center"
              }}
            >
              Your Input :
            </Typography>
            <Box marginTop="15%">
              <IconButton>
                <MicIcon />
              </IconButton>
              <IconButton>
                <MicOffIcon />
              </IconButton>
            </Box>
          </Card>
          <Box
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
          <Box
            marginTop="30%"
            marginLeft="10%"
            marginRight="10%"
            sx={{ flexGrow: 1 }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Item
                  sx={{
                    fontSize: "200%",
                    justifyContent: "center"
                  }}
                >
                  05 : 00
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item
                  sx={{
                    justifyContent: "center"
                  }}
                >
                  username
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Tooltip title="Flip Board">
                    <IconButton
                      sx={{
                        h: "100%",
                        w: "100%"
                      }}
                    >
                      <CachedIcon />
                    </IconButton>
                  </Tooltip>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <IconButton
                    sx={{
                      h: "100%",
                      w: "100%"
                    }}
                  >
                    <FastRewind />
                  </IconButton>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <IconButton
                    sx={{
                      h: "100%",
                      w: "100%"
                    }}
                  >
                    <FirstPageIcon />
                  </IconButton>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <IconButton
                    sx={{
                      h: "100%",
                      w: "100%"
                    }}
                  >
                    <LastPageIcon />
                  </IconButton>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <IconButton
                    sx={{
                      h: "100%",
                      w: "100%"
                    }}
                  >
                    <FastForwardIcon />
                  </IconButton>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Tooltip title="Analysis Board">
                    <IconButton
                      sx={{
                        h: "100%",
                        w: "100%"
                      }}
                    >
                      <TravelExploreIcon />
                    </IconButton>
                  </Tooltip>
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  1
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  2
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={2}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  3
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid border="1px solid" item xs={5}>
                <Item
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  -
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item
                  sx={{
                    fontSize: "200%",
                    justifyContent: "center"
                  }}
                >
                  05 : 00
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item
                  sx={{
                    justifyContent: "center"
                  }}
                >
                  username
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  marginLeft="50%"
                  marginTop="30%"
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Tooltip title="Undo">
                    <IconButton>
                      <SettingsBackupRestoreIcon />
                    </IconButton>
                  </Tooltip>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  marginTop="30%"
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Tooltip title="Draw">
                    <IconButton>
                      <StarHalfIcon />
                    </IconButton>
                  </Tooltip>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item
                  marginTop="30%"
                  marginRight="50%"
                  sx={{
                    justifyContent: "center",
                    display: "flex"
                  }}
                >
                  <Tooltip title="Resign">
                    <IconButton>
                      <FlagIcon />
                    </IconButton>
                  </Tooltip>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    );
  };

  return <Container>{generateBox()}</Container>;
}

export default GBoard;
