import React from "react";

import CachedIcon from "@mui/icons-material/Cached";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewind from "@mui/icons-material/FastRewind";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FlagIcon from "@mui/icons-material/Flag";
import LastPageIcon from "@mui/icons-material/LastPage";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Board from "components/Board";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        fontSize: "1rem",
        fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}

function GamePage() {
  return (
    <Card>
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
        <Board />
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
}

export default GamePage;
