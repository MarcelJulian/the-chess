import React from "react";

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
  return (
    <Box>
      <NavBar />
      <Container />
      <Container>
        {/* Container Atas */}
        <Box border="2px" borderColor="gray.500" borderRadius="lg" h="6rem">
          <GridItem w="100%" h="8" bg="transparent">
            <Center w="500px" h="40px" bg="transparent">
              <Text fontSize={20}>Play With</Text>
            </Center>
          </GridItem>
          {/* Play with atas */}

          {/* Grid Tengah */}
          <Grid templateColumns="repeat(2, 0fr)" gap={0}>
            <GridItem colSpan={2} w="250px" h="60px" bg="transparent">
              <Center w="250px" h="60px" bg="transparent">
                <Button variant="ghost" w="220px" h="50px">
                  Bot
                </Button>
              </Center>
            </GridItem>

            <GridItem
              colStart={3}
              colEnd={5}
              w="240px"
              h="50px"
              bg="transparent"
            >
              <Center w="230px" h="60px" bg="transparent">
                <Button variant="ghost" w="220px" h="50px">
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
            <ButtonGroup spacing="0" size="sm">
              <Button px="0" py="0" m="0" borderRadius="none">
                1
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                2
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                3
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                4
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                5
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                6
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                7
              </Button>
              <Button px="0" py="0" m="0" borderRadius="none">
                8
              </Button>
            </ButtonGroup>
          </GridItem>
          {/* Box color */}
          <GridItem w="100%" h="10" py="0.5rem">
            <Box h="2rem">Color</Box>
            <Flex>
              <Button class="btnBlack" py="1rem" m="0" />
              <Button class="btnWhite" py="0" m="0" />
              <Button class="btnBlack" py="0" m="0" />
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