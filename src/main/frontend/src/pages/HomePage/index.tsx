import React from "react";

import { Box, Container } from "@chakra-ui/react";

import NavBar from "components/NavBar";

function HomePage() {
  return (
    <Box>
      <NavBar />
      <Container />
      <Container>
        <Box border="1px" borderColor="gray.200" borderRadius="lg" h="10rem" />
      </Container>
    </Box>
  );
}

export default HomePage;
