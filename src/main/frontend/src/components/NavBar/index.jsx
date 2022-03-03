import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";

import signInToLichess from "services/authService";
import { signOut } from "store/reducers/sessionSlice";
import { showErrorToast } from "store/reducers/uiSlice";

import NavBarButton from "./NavBarButton";
import RouteLinkButton from "./RouteLinkButton";

function AuthButtonGroup() {
  const dispatch = useDispatch();
  const signInHandler = async () => {
    const response = await signInToLichess();
    if (response.status !== 200)
      dispatch(
        showErrorToast(`Error Code: ${response.status} ${response.statusText}`)
      );
  };

  return (
    <>
      {/* TODO: */}
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

function NavBar() {
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
