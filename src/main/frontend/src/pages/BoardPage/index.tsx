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
        <CBoard />
      </Container>
    </Flex>
  );
}

export default BoardPage;
