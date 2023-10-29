import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    id: null,
    clock: null,
    white: null,
    black: null,
    gameState: null,
    isWhite: "white",
    isWhiteTurn: null,
    lastMove: null,
    hasMoved: null,
    isVsAi: null
  },
  reducers: {
    initializeGame: (state, action) => {
      state.id = action.payload.id;
      state.clock = action.payload.clock;
      state.white = action.payload.white;
      state.black = action.payload.black;
      state.gameState = action.payload.state;
      state.isWhite = action.payload.isWhite;
      state.isWhiteTurn = action.payload.isWhiteTurn;
      state.lastMove = action.payload.lastMove;
      state.hasMoved = action.payload.hasMoved;
      state.isVsAi = action.payload.isVsAi;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
      state.isWhiteTurn = action.payload.isWhiteTurn;
      state.lastMove = action.payload.lastMove;
      state.hasMoved = action.payload.hasMoved;
    }
  }
});

// Action creators are generated for each case reducer function
export const { initializeGame, setGameState } = gameSlice.actions;

export default gameSlice.reducer;
