import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { Link as RouterLink } from "react-router-dom";

import signIn from "services/authService";

function NavBarButton({ to, text, onClick }) {
  return (
    <Link component={RouterLink} to={to}>
      <Button
        variant="link"
        p="0.5rem"
        m="0.5rem"
        onClick={onClick}
        sx={{ display: "block", color: "white" }}
      >
        {text}
      </Button>
    </Link>
  );
}

function NavBar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signInHandler = async () => {
    const response = await signIn();
    console.log(
      "🚀 ~ file: index.jsx ~ line 46 ~ signInHandler ~ response",
      response
    );
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Box display="flex">
            <NavBarButton to="/" text="TheChess" />
            <NavBarButton to="/" text="Home" />
            {/* TODO:tutorial page */}
            <NavBarButton to="/" text="Tutorial" />
            <NavBarButton to="/settings" text="Settings" />
          </Box>
          <Box display="flex" ml="auto">
            {/* TODO: */}
            <NavBarButton to="/" text="Register" />
            <NavBarButton onClick={signInHandler} to="/" text="Sign In" />

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>Sign In</DialogContentText> */}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Username/Email"
                  type=""
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Sign In
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default NavBar;
