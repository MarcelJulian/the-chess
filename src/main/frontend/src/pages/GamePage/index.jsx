import React, { useState } from "react";

import Box from "@mui/material/Box";
import Chess from "chess.js";

import Board from "components/Board";

import GameControlCard from "./GameControlCard";
import VoiceControlCard from "./VoiceControlCard";

function CenteredFlexBox(props) {
  const { ...other } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...other}
    />
  );
}

function GamePage() {
  const [game, setGame] = useState(new Chess());

  const setGameHandler = (g) => setGame(g);

  /** 
   Outer box (1 rem)
    
   Voice Control Card - Board - Game Control Card
   (3 rem) - (1 rem) - (3 rem)

   |                                           |
   |  1 (3)  c  (3) (1)  c  (1) (3)  c  (3) 1  |
   |                                           |

   These makes evenly spaced components (4 rem)
   * */

  return (
    <CenteredFlexBox
      justifyContent="center"
      // 64px is the navbar height
      height="calc(100vh - 64px)"
      paddingX="1rem"
    >
      <CenteredFlexBox width="30%" padding="3rem">
        <VoiceControlCard />
      </CenteredFlexBox>
      <CenteredFlexBox width="40%" padding="1rem">
        <Board game={game} setGameHandler={setGameHandler} />
      </CenteredFlexBox>
      <CenteredFlexBox width="30%" padding="3rem">
        <GameControlCard game={game} />
      </CenteredFlexBox>
    </CenteredFlexBox>
  );
}

export default GamePage;
