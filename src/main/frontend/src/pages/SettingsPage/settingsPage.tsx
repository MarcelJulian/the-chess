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
  Select,
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
      <Container marginTop="5%">
        {/* Container */}
        <Grid
          border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(2, 1fr)"
          w="100%"
          gap={0}
        >
          {/* Tulisan Board Theme */}
          <Text
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="0%"
            marginTop="5%"
            marginLeft="5%"
            marginRight="5%"
            // border="1px"
            // borderRadius="lg"
            fontSize={15}
          >
            BoardTheme
          </Text>

          {/* Box pilihan Board Theme */}
          <Box
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="0%"
            marginTop="5%"
            marginLeft="10%"
            marginRight="10%"
            // border="1px"
            // borderRadius="lg"
          >
            <Center>
              <Select placeholder="Choose Theme set">
                <option value="option1">Theme 1</option>
                <option value="option2">Theme 2</option>
                <option value="option3">Theme 3</option>
              </Select>
            </Center>
          </Box>

          {/* Tulisan Piece Set */}
          <Text
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="0%"
            // marginTop="15%"
            marginLeft="5%"
            marginRight="5%"
            // border="1px"
            // borderRadius="lg"
            fontSize={15}
          >
            Piece Set
          </Text>
          {/* Box pilihan Piece Set */}
          <Box
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="20%"
            // marginTop="15%"
            marginLeft="10%"
            marginRight="10%"
            // border="1px"
            // borderRadius="lg"
          >
            <Center>
              <Select placeholder="Choose Piece Set">
                <option value="option1">Piece 1</option>
                <option value="option2">Piece 2</option>
                <option value="option3">Piece 3</option>
              </Select>
            </Center>
          </Box>

          {/* Tulisan Sound */}
          <Text
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="0%"
            // marginTop="15%"
            marginLeft="5%"
            marginRight="5%"
            // border="1px"
            // borderRadius="lg"
            fontSize={15}
          >
            Sound
          </Text>

          {/* Box pilihan Sound */}
          <Box
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="15%"
            // marginTop="0%"
            marginLeft="10%"
            marginRight="10%"
            // border="1px"
            // borderRadius="lg"
          >
            <Center>
              <Text fontSize={15}>Pilihan box</Text>
            </Center>
          </Box>
          {/* Tulisan Voice Control */}
          <Text
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="0%"
            // marginTop="15%"
            marginLeft="5%"
            marginRight="5%"
            // border="1px"
            // borderRadius="lg"
            fontSize={15}
          >
            Voice Control
          </Text>

          {/* Box pilihan Voice Control */}
          <Box
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            // marginBottom="15%"
            // marginTop="0%"
            marginLeft="10%"
            marginRight="10%"
            // border="1px"
            // borderRadius="lg"
          >
            <Center>
              <Stack direction="row">
                <Switch colorScheme="teal" size="md" />
              </Stack>
            </Center>
          </Box>

          {/* Tulisan Blind mode */}
          <Text
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            marginBottom="5%"
            // marginTop="15%"
            marginLeft="5%"
            marginRight="5%"
            // border="1px"
            // borderRadius="lg"
            fontSize={15}
          >
            Blind Mode
          </Text>

          {/* Box pilihan Blind Mode */}
          <Box
            px="0.5rem"
            py="0.5rem"
            bgColor="blue.200"
            marginBottom="5%"
            // marginTop="0%"
            marginLeft="10%"
            marginRight="10%"
            // border="1px"
            // borderRadius="lg"
          >
            <Center>
              <Stack direction="row">
                <Switch colorScheme="teal" size="md" />
              </Stack>
            </Center>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default SettingsPage;
