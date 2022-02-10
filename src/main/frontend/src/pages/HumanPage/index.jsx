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

function HumanPage() {
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
      <ButtonGroup spacing="0" size="xs">
        {buttons}
      </ButtonGroup>
    );
  };

  return (
    <Box>
      <Container>
        {/* Container Atas */}
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
          // border="1px"
          borderColor="gray.800"
          borderRadius="lg"
          templateRows="repeat(2, 3fr)"
          templateColumns="repeat(3, 5fr)"
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
              <Text fontSize={25}>5+3</Text>
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
              <Text fontSize={25}>30+20</Text>
            </Center>
          </Button>
        </Grid>
      </Container>
    </Box>
  );
}

export default HumanPage;