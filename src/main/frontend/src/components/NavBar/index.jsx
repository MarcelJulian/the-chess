import React from "react";

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import MaterialBox from "@material-ui/core/Box";
import MaterialButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MaterialLink from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

function NavBarButton({ to, text, onClick }) {
  return (
    <MaterialLink component={RouterLink} to={to}>
      <MaterialButton
        variant="link"
        p="0.5rem"
        m="0.5rem"
        onClick={onClick}
        sx={{ display: "block" }}
      >
        {text}
      </MaterialButton>
    </MaterialLink>
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

  return (
    <AppBar>
      <Toolbar disableGutters>
        <MaterialBox display="flex">
          <NavBarButton to="/" text="TheChess" />
          <NavBarButton to="/" text="Home" />
          {/* TODO:tutorial page */}
          <NavBarButton to="/" text="Tutorial" />
          <NavBarButton to="/settings" text="Settings" />
        </MaterialBox>
        <MaterialBox display="flex" ml="auto">
          {/* TODO: */}
          <NavBarButton to="/" text="Register" />
          <NavBarButton onClick={handleClickOpen} to="/" text="Sign In" />

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
              <MaterialButton onClick={handleClose} color="primary">
                Sign In
              </MaterialButton>
            </DialogActions>
          </Dialog>
        </MaterialBox>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
