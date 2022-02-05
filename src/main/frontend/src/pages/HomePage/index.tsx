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
  Stack,
  Switch,
  border
} from "@chakra-ui/react";

import NavBar from "components/NavBar";

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const [botStrength, setBotStrength] = useState(1);
  const [botColor, setBotColor] = useState("random");
  const [botTimeControlMode, setBotTimeControlMode] = useState("unlimited");
  const [botTimeControlMinute, setBotTimeControlMinute] = useState(10);
  const [botTimeControlIncrement, setBotTimeControlIncrement] = useState(0);

  const generateBotStrengthGroupButton = () => {
    const buttons: JSX.Element[] = [];

    for (let i = 1; i < 9; i++) {
      buttons.push(
        <Button
          borderLeftRadius={i === 1 ? "md" : "none"}
          borderRightRadius={i === 8 ? "md" : "none"}
          isActive={botStrength === i}
          onClick={() => setBotStrength(i)}
        >
          {i}
        </Button>
      );
    }
    return (
      <ButtonGroup spacing="0" size="xs">
        {buttons}
      </ButtonGroup>
    );
  };

  return (
    <Box>
      <Container>
        {/* Container Atas */}
        <Grid
          // border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(2, 3fr)"
          templateColumns="repeat(2, 5fr)"
          border="1px"
          gap={0}
        >
          <GridItem w="100%" h="10" bg="transparent" colSpan={2}>
            <Center>
              <Text fontSize={20}>Play With</Text>
            </Center>
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            bg="transparent"
            border="1px"
            borderBottomLeftRadius="lg"
            marginBottom="0%"
          >
            <Center>
              <Button variant="ghost" w="99%">
                Bot
              </Button>
            </Center>
          </GridItem>

          <GridItem
            w="100%"
            h="10"
            bg="transparent"
            border="1px"
            borderBottomRightRadius="lg"
            marginBottom="0%"
          >
            <Center>
              <Button variant="ghost" w="99%">
                Human
              </Button>
            </Center>
          </GridItem>
        </Grid>

        {/* Container Bawah */}
        <Grid
          border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(2, 1fr)"
          marginTop="5%"
          gap={0}
        >
          {/* Box Strength Level AI */}
          <GridItem px="1rem" py="0.5rem">
            <Box>Strength</Box>
            {generateBotStrengthGroupButton()}
          </GridItem>
          {/* Box color */}
          <GridItem w="100%" h="10" py="0.5rem">
            <Box h="2rem">Color</Box>
            <Flex justifyContent="space-evenly">
              <Button
                bgColor="black"
                border="2px"
                size="xs"
                borderRadius="100%"
                m="0"
                isActive={botColor === "black"}
                onClick={() => {
                  setBotColor("black");
                }}
                _hover={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
                _active={{}}
              />
              <Button
                bgColor="white"
                border="2px"
                size="xs"
                borderRadius="100%"
                py="0"
                m="0"
                isActive={botColor === "white"}
                onClick={() => {
                  setBotColor("white");
                }}
                _hover={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
                _active={{}}
              />
              <Button
                bgColor="gray"
                border="2px"
                size="xs"
                borderRadius="100%"
                m="0"
                isActive={botColor === "random"}
                onClick={() => {
                  setBotColor("random");
                }}
                _hover={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
                _active={{}}
              />
            </Flex>
          </GridItem>
          {/* Box Time Control */}
          <GridItem w="100%" h="10" px="1rem" py="1rem">
            <Box>Time Control</Box>
          </GridItem>
          {/* Box Toggle */}
          <GridItem w="100%" h="5" bg="transparent" py="1rem">
            <Grid templateColumns="repeat(3, 1fr)" gap={0}>
              <GridItem w="100%" h="10" bg="transparen">
                <Text fontSize={13}>Unlimited</Text>
              </GridItem>
              <GridItem w="100%" px="10px" h="10" bg="transparen">
                <Stack direction="row">
                  <Switch colorScheme="teal" size="md" />
                </Stack>
              </GridItem>
              <GridItem w="100%" h="10" bg="transparen">
                <Text fontSize={13}>Real-Time</Text>
              </GridItem>
            </Grid>
          </GridItem>

          {/* Box Minute Per Side */}
          <GridItem w="100%" h="1" bg="transparent">
            <Box px="1rem" py="0.5rem">
              Minute Per Side :{" "}
            </Box>
            <Box paddingLeft={5} paddingRight={58}>
              <Slider aria-label="slider-ex-1" defaultValue={10}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </GridItem>

          {/* Box Minute Per Side */}
          <GridItem w="100%" h="1" bg="transparent">
            <Box py="0.5rem">Increment in second : </Box>
            <Box paddingRight={5}>
              <Slider aria-label="slider-ex-1" defaultValue={10}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </GridItem>

          {/* Box START */}
          <GridItem w="100%" h="10" bg="transparent" colSpan={2}>
            <Center>
              <Button colorScheme="blue">Start</Button>
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
