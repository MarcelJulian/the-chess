import React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  GridItem
} from "@chakra-ui/react";

import NavBar from "components/NavBar";

function HomePage() {
  return (
    <Box>
      <NavBar />
      <Container />
      <Container>
        <Grid
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem px="1rem" py="0.5rem">
            <Box>Strength</Box>
            <ButtonGroup spacing="0" size="sm">
              <Button px="0" py="0" m="0" borderRadius="none">
                1
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                2
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                3
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                4
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                5
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                6
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                7
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                8
              </Button>
            </ButtonGroup>
          </GridItem>
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" colSpan={2} />
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
