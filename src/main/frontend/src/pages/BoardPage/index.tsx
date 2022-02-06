import React, { useState } from "react";

import { ChevronLeftIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
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
  grid,
  HStack,
  Icon,
  createIcon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
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
            marginRight="10%"
            marginTop="40%"
            marginBottom="250%"
            border="1px"
            borderColor="gray.800"
            borderRadius="lg"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(1, 1fr)"
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

            <Switch size="sm" />
          </Grid>

          {/* Grid tengah(board) */}

          <CBoard />

          {/* Grid kanan */}
          <Grid
            marginLeft="10%"
            marginTop="20%"
            marginBottom="180%"
            borderColor="gray.800"
            templateRows="repeat(8, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={0}
          >
            <GridItem colSpan={2} paddingTop="10%">
              <Text fontSize={15}>
                <b>*Count down* </b>
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text fontSize={14}>*Player Name*</Text>
            </GridItem>
            {/* chess steps */}
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />
            <GridItem border="1px" />

            {/* button undo */}
            <GridItem paddingTop="5%">
              <Center>
                <Button colorScheme="teal" variant="outline">
                  <HStack>
                    {/* The default icon size is 1em (16px) */}
                    <Icon as={ChevronLeftIcon} color="red.500" />
                  </HStack>
                </Button>
              </Center>
            </GridItem>

            {/* button resign */}
            <GridItem paddingTop="5%">
              <Center>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="teal" variant="outline">
                      <HStack>
                        {/* The default icon size is 1em (16px) */}
                        <Icon as={SmallCloseIcon} color="red.500" />
                      </HStack>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Resign Confirmation</PopoverHeader>
                    <PopoverBody>
                      <Button colorScheme="teal" variant="outline">
                        <HStack>
                          {/* The default icon size is 1em (16px) */}
                          <Icon as={SmallCloseIcon} color="red.500" />
                        </HStack>
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Center>
            </GridItem>
            <GridItem colSpan={2} paddingTop="10%">
              <Text fontSize={15}>
                <b>*Count down* </b>
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text fontSize={14}>*Player Name*</Text>
            </GridItem>
          </Grid>
        </Grid>
      </Container>
    </Flex>
  );
}

export default BoardPage;
