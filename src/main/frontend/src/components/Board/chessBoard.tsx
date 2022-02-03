import React, { useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid
} from "@chakra-ui/react";

function CBoard() {
  const generateBox = () => {
    const boxes: JSX.Element[] = [];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        boxes.push(<Box border="1px" bgColor="gray.800" />);
        boxes.push(<Box border="1px" bgColor="black.200" />);
      }
      for (let i = 0; i < 4; i++) {
        boxes.push(<Box border="1px" bgColor="black.200" />);
        boxes.push(<Box border="1px" bgColor="gray.800" />);
      }
    }
    return (
      <Grid
        border="1px"
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.800"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(8, 1fr)"
        w="30rem"
        h="30rem"
        gap={0}
      >
        {boxes}
      </Grid>
    );
  };

  // function CBoard() {
  return (
    <Flex>
      <Box>
        <Container>
          {/* Chess board */}
          {/* <Grid
            border="1px"
            borderLeft="1px"
            borderRight="1px"
            borderColor="gray.800"
            templateRows="repeat(8, 1fr)"
            templateColumns="repeat(8, 1fr)"
            w="30rem"
            h="30rem"
            gap={2}
          >
            <Box border="1px" bgColor="blue.200" />
            <Box border="1px" bgColor="blue.800" />

      
          </Grid> */}
          {generateBox()}
        </Container>
      </Box>
    </Flex>
  );
}

export default CBoard;
