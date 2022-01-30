import React from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

function NavBar() {
  return (
    <Flex>
      <Box>
        <Button variant="link" p="0.5rem" m="0.5rem">
          TheChess
        </Button>
        <Button variant="link" p="0.5rem" m="0.5rem">
          Home
        </Button>
        <Button variant="link" p="0.5rem" m="0.5rem">
          Tutorial
        </Button>
        <Button variant="link" p="0.5rem" m="0.5rem">
          Settings
        </Button>
      </Box>
      <Box ml="auto">
        <Button variant="link" p="0.5rem" m="0.5rem">
          Register
        </Button>
        <Button variant="link" p="0.5rem" m="0.5rem">
          Sign In
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
