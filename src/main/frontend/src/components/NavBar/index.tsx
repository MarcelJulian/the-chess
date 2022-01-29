import React from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

function NavBar() {
  return (
    <Flex>
      <Box>
        <Button variant="link">TheChess</Button>
        <Button variant="link">Home</Button>
        <Button variant="link">Tutorial</Button>
        <Button variant="link">Settings</Button>
      </Box>
      <Box ml="auto">
        <Button variant="link">Register</Button>
        <Button variant="link">Sign In</Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
