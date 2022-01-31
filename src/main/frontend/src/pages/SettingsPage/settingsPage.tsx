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

function SettingsPage() {
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
        {/* Container */}
        <Grid
          border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(1, 5fr)"
          gap={0}
        >
          <Button
            px="2rem"
            py="3rem"
            bgColor="blue.200"
            marginBottom="5%"
            marginTop="10%"
            marginLeft="10%"
            marginRight="10%"
            border="1px"
            borderRadius="lg"
          >
            <Center>
              <Text fontSize={25}>5asdasd+3</Text>
            </Center>
          </Button>

          <Button
            px="2rem"
            py="3rem"
            bgColor="blue.200"
            marginBottom="5%"
            marginTop="10%"
            marginLeft="10%"
            marginRight="10%"
            border="1px"
            borderRadius="lg"
          >
            <Center>
              <Text fontSize={25}>10+0</Text>
            </Center>
          </Button>

          <Button
            px="2rem"
            py="3rem"
            bgColor="blue.200"
            marginBottom="5%"
            marginTop="10%"
            marginLeft="10%"
            marginRight="10%"
            border="1px"
            borderRadius="lg"
          >
            <Center>
              <Text fontSize={25}>10+5</Text>
            </Center>
          </Button>

          <Button
            px="2rem"
            py="3rem"
            bgColor="blue.200"
            marginBottom="5%"
            marginTop="10%"
            marginLeft="10%"
            marginRight="10%"
            border="1px"
            borderRadius="lg"
          >
            <Center>
              <Text fontSize={25}>15+10</Text>
            </Center>
          </Button>

          <Button
            px="2rem"
            py="3rem"
            bgColor="blue.200"
            marginBottom="5%"
            marginTop="10%"
            marginLeft="10%"
            marginRight="10%"
            border="1px"
            borderRadius="lg"
          >
            <Center>
              <Text fontSize={25}>30+0</Text>
            </Center>
          </Button>
        </Grid>
      </Container>
    </Box>
  );
}

export default SettingsPage;
