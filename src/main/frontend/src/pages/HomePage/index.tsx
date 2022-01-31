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
  Switch
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
      <NavBar />
      <Container>
        {/* Container Atas */}
        <Box border="2px" borderColor="gray.500" borderRadius="lg" h="6rem">
          <GridItem w="100%" bg="transparent">
            <Center bg="transparent">
              <Text fontSize={25}>Play With</Text>
            </Center>
          </GridItem>
          {/* Play with atas */}

          {/* Grid Tengah */}
          <Grid templateColumns="repeat(2, 50%)" gap={0}>
            <GridItem>
              <Center>
                <Button w="90%" variant="ghost">
                  Bot
                </Button>
              </Center>
            </GridItem>

            <GridItem>
              <Center>
                <Button w="90%" variant="ghost">
                  Human
                </Button>
              </Center>
            </GridItem>
          </Grid>
        </Box>
        <hr />
        <hr />
        <hr />
        <hr />

        {/* Container Bawah */}
        <Grid
          border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(2, 1fr)"
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
            <Flex>
              <Button w="100%" class="btnBlack" py="1rem" m="0" />
              <Button w="100%" class="btnWhite" py="0" m="0" />
              <Button w="100%" class="btnBlack" py="0" m="0" />
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
