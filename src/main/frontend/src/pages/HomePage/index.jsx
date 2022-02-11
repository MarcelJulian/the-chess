import React, { PropsWithChildren, useState } from "react";

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
  useRadio,
  useRadioGroup,
  UseRadioProps
} from "@chakra-ui/react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === "dark" && {
        main: amber[300]
      })
    },
    ...(mode === "dark" && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900]
      }
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800]
          }
        : {
            primary: "#fff",
            secondary: grey[500]
          })
    }
  }
});
const darkModeTheme = createTheme(getDesignTokens("dark"));

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const [botStrength, setBotStrength] = useState(1);
  const [botColor, setBotColor] = useState("random");
  const [botTimeControlMode, setBotTimeControlMode] = useState("unlimited");
  const [botTimeControlMinute, setBotTimeControlMinute] = useState(10);
  const [botTimeControlIncrement, setBotTimeControlIncrement] = useState(0);

  const generateBotStrengthGroupButton = () => {
    const buttons = [];

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
      <ButtonGroup spacing="0" size="sm">
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
        <Flex
          border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          marginTop="5%"
          flexDir="column"
        >
          {/* Box Strength Level AI */}
          <Box px="1rem" py="0.5rem">
            <Center mb="0.5rem">Strength</Center>
            <Center>{generateBotStrengthGroupButton()}</Center>
          </Box>
          {/* Box color */}
          <Box w="100%" py="0.5rem">
            <Center mb="0.5rem">Color</Center>
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
          </Box>
          {/* Box Time Control */}
          <Box w="100%" px="1rem" py="1rem">
            <Center>Time Control</Center>
          </Box>
          {/* Box Toggle */}
          <Box w="100%" h="5" bg="transparent" py="1rem">
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
          </Box>

          {/* Box Minute Per Side */}
          <Box w="100%" bg="transparent">
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
          </Box>

          {/* Box Minute Per Side */}
          <Box w="100%" bg="transparent">
            <Box py="0.5rem">Increment in second : </Box>
            <Box paddingRight={5}>
              <Slider aria-label="slider-ex-1" defaultValue={10}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Box>

          {/* Box START */}
          <Box w="100%" h="10" bg="transparent" colSpan={2}>
            <Center>
              <Button colorScheme="blue">Start</Button>
            </Center>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600"
        }}
        _focus={{
          boxShadow: "outline"
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default HomePage;
