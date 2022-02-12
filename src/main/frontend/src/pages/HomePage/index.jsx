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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MaterialBox from "@mui/material/Box";
import MaterialButton from "@mui/material/Button";
import MaterialButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import { amber, deepOrange, grey } from "@mui/material/colors";
import MaterialContainer from "@mui/material/Container";
import MaterialGrid from "@mui/material/Grid";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const [botStrength, setBotStrength] = useState(1);
  const [botColor, setBotColor] = useState("random");
  const [botTimeControlMode, setBotTimeControlMode] = useState("unlimited");
  const [botTimeControlMinute, setBotTimeControlMinute] = useState(10);
  const [botTimeControlIncrement, setBotTimeControlIncrement] = useState(0);

  const handleBotStrengthChange = (_, strength) => {
    setBotStrength(strength);
  };

  const handleBotTimeControlModeChange = (_, mode) => {
    setBotTimeControlMode(mode);
  };

  const generateBotStrengthGroupButton = () => {
    const buttons = [];

    for (let i = 1; i < 9; i++) {
      buttons.push(
        <ToggleButton value={i} disableFocusRipple disableRipple>
          <Typography variant="button" sx={{ paddingX: "0.5rem" }}>
            {i}
          </Typography>
        </ToggleButton>
      );
    }
    return (
      <ToggleButtonGroup
        value={botStrength}
        exclusive
        onChange={handleBotStrengthChange}
        size="large"
        sx={{ border: 1 }}
      >
        {buttons}
      </ToggleButtonGroup>
    );
  };

  return (
    <MaterialBox sx={{ marginTop: "6rem" }}>
      <MaterialContainer>
        {/* Container Atas */}
        <Card sx={{ marginBottom: "1rem" }}>
          <MaterialBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ paddingY: "1rem" }}
          >
            <Typography variant="h4">Play With</Typography>

            <MaterialBox
              display="flex"
              justifyContent="space-evenly"
              sx={{ width: "100%" }}
            >
              <MaterialButton variant="ghost" sx={{ width: "48%" }}>
                Bot
              </MaterialButton>

              <MaterialButton variant="ghost" sx={{ width: "48%" }}>
                Human
              </MaterialButton>
            </MaterialBox>
          </MaterialBox>
        </Card>

        {/* Container Bawah */}
        <Card sx={{ marginBottom: "1rem" }}>
          <MaterialBox display="flex" flexDirection="column">
            {/* Box Strength Level AI */}
            <MaterialBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
            >
              <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                Strength
              </Typography>
              {generateBotStrengthGroupButton()}
            </MaterialBox>
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
            <MaterialBox
              sx={{ display: "flex", width: "100%", padding: "1rem" }}
            >
              <MaterialBox sx={{ mx: "auto" }}>Time Control</MaterialBox>
              <ToggleButtonGroup
                color="primary"
                value={botTimeControlMode}
                exclusive
                onChange={handleBotTimeControlModeChange}
              >
                <ToggleButton value="unlimited">Unlimited</ToggleButton>
                <ToggleButton value="realtime">Real Time</ToggleButton>
              </ToggleButtonGroup>
            </MaterialBox>
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
          </MaterialBox>
        </Card>
      </MaterialContainer>
    </MaterialBox>
  );
}

export default HomePage;
