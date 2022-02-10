import React from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link
} from "@chakra-ui/react";
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
        <NavBarButton to="/" text="Sign In" />
      </Box>
    </Flex>
  );
}

export default NavBar;
