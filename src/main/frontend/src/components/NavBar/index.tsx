import React from "react";

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type NavBarButtonProps = {
  to: string;
  text: string;
};

function NavBarButton({ to, text }: NavBarButtonProps) {
  return (
    <Link as={RouterLink} to={to}>
      <Button variant="link" p="0.5rem" m="0.5rem">
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
