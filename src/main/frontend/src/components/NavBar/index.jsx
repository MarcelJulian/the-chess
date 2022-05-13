import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";

import signInToLichess from "services/authService";
import { signOut } from "store/reducers/sessionSlice";
import {
  setIsDarkMode,
  showRequestErrorToast,
  showSettingsDialog
} from "store/reducers/uiSlice";

import NavBarButton from "./NavBarButton";
import RouteLinkButton from "./RouteLinkButton";

function AuthButtonGroup() {
  const dispatch = useDispatch();
  const signInHandler = async () => {
    const response = await signInToLichess();
    if (response.status !== 200) dispatch(showRequestErrorToast(response));
  };

  return (
    <>
      {/* TODO: */}
      <NavBarButton
        text="Settings"
        onClick={() => dispatch(showSettingsDialog())}
      />
      <NavBarButton text="Register" />
      <NavBarButton text="Sign In" onClick={signInHandler} />
    </>
  );
}

function UserButtonGroup() {
  const dispatch = useDispatch();
  const signOutHandler = () => dispatch(signOut());

  return (
    <>
      <NavBarButton
        text="Settings"
        onClick={() => dispatch(showSettingsDialog())}
      />
      <NavBarButton text="Sign Out" onClick={signOutHandler} />
    </>
  );
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    // transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 24"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M10 4c4.41 0 8 3.59 8 8s-3.59 8-8 8c-.34 0-.68-.02-1.01-.07C10.9 17.77 12 14.95 12 12s-1.1-5.77-3.01-7.93C9.32 4.02 9.66 4 10 4m0-2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/></svg>')`
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8f96A5" : "#aab4be"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.light,
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2
  }
}));

function NavBar() {
  const theme = useTheme();
  const backgroundColor = theme.palette.primary.main;

  const isSignedIn = useSelector((state) => state.session.isSignedIn);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  const dispatch = useDispatch();

  const handleShowAuthButton = () => {
    if (isSignedIn) return UserButtonGroup();
    return AuthButtonGroup();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor, backgroundImage: "none" }}
      >
        <Toolbar disableGutters>
          <Box display="flex">
            {/* TODO:show logo */}
            <RouteLinkButton to="/" text="TheChess" />
            <RouteLinkButton to="/" text="Home" />
            {/* TODO:tutorial page */}
            <RouteLinkButton to="/tutorial" text="Tutorial" />
          </Box>
          <Box display="flex" ml="auto">
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={isDarkMode}
              onChange={(e) => dispatch(setIsDarkMode(e.target.checked))}
            />
            {handleShowAuthButton()}
          </Box>
        </Toolbar>
      </AppBar>
      {/* to prevent components showing below/behind navbar */}
      <Toolbar />
    </>
  );
}

export default NavBar;
