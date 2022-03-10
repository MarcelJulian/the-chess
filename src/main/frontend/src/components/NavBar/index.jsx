import React from "react";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";

import signInToLichess from "services/authService";
import { signOut } from "store/reducers/sessionSlice";
import { showRequestErrorToast } from "store/reducers/uiSlice";

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
      <NavBarButton text="Settings" />
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
      <NavBarButton text="Settings" />
      <NavBarButton text="Sign Out" onClick={signOutHandler} />
    </>
  );
}

function NavBar({ themeHandler }) {
  const { isSignedIn } = useSelector((state) => state.session);

  const handleShowAuthButton = () => {
    if (isSignedIn) return UserButtonGroup();
    return AuthButtonGroup();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Box display="flex">
            <RouteLinkButton to="/" text="TheChess" />
            <RouteLinkButton to="/" text="Home" />
            {/* TODO:tutorial page */}
            <RouteLinkButton to="/" text="Tutorial" />
          </Box>
          <Box display="flex" ml="auto">
            <IconButton
              onClick={() => themeHandler()}
              onChange={<Brightness4Icon />}
              color="inherit"
            >
              <Brightness7Icon />
              <Brightness4Icon />
            </IconButton>
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
