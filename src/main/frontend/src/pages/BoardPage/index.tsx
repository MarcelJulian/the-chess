import React, { useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  GridItem,
  Slider,
  Flex,
  // Spacer,
  Center,
  Text,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  NumberInput,
  Stack,
  Select,
  Switch,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  grid
} from "@chakra-ui/react";

import CBoard from "components/Board/chessBoard";
import NavBar from "components/NavBar";

function BoardPage() {
  // replace with store
  const [botStrength, setBotStrength] = useState(1);

  const generateBoard = () => {
    const buttons: JSX.Element[] = [];

    for (let i = 1; i < 12; i++) {
      buttons.push(
        <Grid isActive={botStrength === i} onClick={() => setBotStrength(i)}>
          {i}
        </Grid>
      );
    }

    return (
      <GridItem spacing="0" size="xs">
        {buttons}
      </GridItem>
    );
  };

  return (
    <Flex>
      <Container>
        <Grid
          marginLeft="-50%"
          w="200%"
          // bgColor="red.200"
          borderColor="gray.800"
          templateRows="repeat(1,25fr)"
          templateColumns="repeat(3, 25fr)"
          // border="1px"
          gap={0}
        >
          {/* Grid kiri */}
          <Grid
            w="100%"
            marginTop="70%"
            marginBottom="70%"
            border="1px"
            borderColor="gray.800"
            borderRadius="lg"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(1, 5fr)"
            gap={0}
          >
            {/* isi kiri */}
            <GridItem>
              <Center>
                <Text fontSize={15}>
                  <b>Input : </b>
                </Text>
              </Center>
            </GridItem>
            <GridItem>
              <Center>
                <Text fontSize={14}>*Pawn to E4*</Text>
              </Center>
            </GridItem>
            <GridItem>
              <Center>
                <Text fontSize={15}>
                  <b>Result : </b>
                </Text>
              </Center>
            </GridItem>
            <GridItem>
              <Center>
                <Text fontSize={14}>*E4*</Text>
              </Center>
            </GridItem>
          </Grid>
          {/* Grid tengah(board) */}

          <CBoard />

          {/* Grid kanan */}
          <Grid
            marginTop="60%"
            marginBottom="60%"
            border="1px"
            borderColor="gray.800"
            borderRadius="lg"
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(2, 5fr)"
            gap={0}
          >
            <GridItem colSpan={2}>
              <Center>
                <Text fontSize={15}>
                  <b>*Count down* </b>
                </Text>
              </Center>
            </GridItem>
            <GridItem colSpan={2}>
              <Center>
                <Text fontSize={14}>*Player Name*</Text>
              </Center>
            </GridItem>
            {/* button draw */}
            <GridItem>
              <Center>
                <Button colorScheme="teal" variant="outline">
                  Resign
                </Button>
              </Center>
            </GridItem>
            {/* button resign */}
            <GridItem>
              <Center>
                <Button colorScheme="teal" variant="outline">
                  Draw
                </Button>
              </Center>
            </GridItem>
            <GridItem colSpan={2} paddingTop="10%">
              <Center>
                <Text fontSize={15}>
                  <b>*Count down* </b>
                </Text>
              </Center>
            </GridItem>
            <GridItem colSpan={2}>
              <Center>
                <Text fontSize={14}>*Player Name*</Text>
              </Center>
            </GridItem>
          </Grid>
        </Grid>
      </Container>
    </Flex>
  );
}

export default BoardPage;
