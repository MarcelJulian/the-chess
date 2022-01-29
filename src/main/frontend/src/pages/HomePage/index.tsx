import React from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

function HomePage() {
  return (
    <Flex>
      <Box>
        <Button colorScheme="red" variant="link">
          Logo
        </Button>
        <Button colorScheme="red" variant="link">
          Home
        </Button>
        <Button colorScheme="red" variant="link">
          Tutorial
        </Button>
        <Button colorScheme="red" variant="link">
          Settings
        </Button>
      </Box>
      <Box ml="auto">
        <Button colorScheme="red" variant="link">
          Register
        </Button>
        <Button colorScheme="red" variant="link">
          Sign In
        </Button>
      </Box>
    </Flex>
  );
}

export default HomePage;
