import React, { RefObject } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link
} from "@chakra-ui/react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Link as RouterLink } from "react-router-dom";

function NavBarButton({ to, text, onClick }) {
  return (
    <Link as={RouterLink} to={to}>
      <Button variant="link" p="0.5rem" m="0.5rem" onClick={onClick}>
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

  return (
    <Flex>
      <Box>
        <NavBarButton to="/" text="TheChess" />
        <NavBarButton to="/" text="Home" />
        {/* TODO:tutorial page */}
        <NavBarButton to="/" text="Tutorial" />
        <NavBarButton to="/settings" text="Settings" />
      </Box>
      <Box ml="auto">
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
            <Button onClick={handleClose} color="primary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Flex>
  );
}

export default NavBar;
