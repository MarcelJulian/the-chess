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
        {/* <VoiceCard /> */}
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
            <Grid border="1px solid" item xs={3}>
              <IconButtonGridItemContainer icon={<FastRewind />} />
            </Grid>
            <Grid border="1px solid" item xs={3}>
              <IconButtonGridItemContainer icon={<FirstPageIcon />} />
            </Grid>
            <Grid border="1px solid" item xs={3}>
              <IconButtonGridItemContainer icon={<LastPageIcon />} />
            </Grid>
            <Grid border="1px solid" item xs={3}>
              <IconButtonGridItemContainer icon={<FastForwardIcon />} />
            </Grid>
            <Grid border="1px solid" item xs={2}>
              <CenteredGridItemContainer label="1" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
            </Grid>
            <Grid border="1px solid" item xs={2}>
              <CenteredGridItemContainer label="2" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
            </Grid>
            <Grid border="1px solid" item xs={2}>
              <CenteredGridItemContainer label="3" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
            </Grid>
            <Grid border="1px solid" item xs={5}>
              <CenteredGridItemContainer label="-" />
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

function CenteredGridItemContainer({ component, label }) {
  return (
    <Item
      sx={{
        justifyContent: "center",
        display: "flex"
      }}
    >
      {component ?? label}
    </Item>
  );
}

function IconButtonGridItemContainer({ icon }) {
  const iconButton = (
    <IconButton
      sx={{
        h: "100%",
        w: "100%"
      }}
    >
      {icon}
    </IconButton>
  );
  return <CenteredGridItemContainer component={iconButton} />;
}

function VoiceCard() {
  return (
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
  );
}
