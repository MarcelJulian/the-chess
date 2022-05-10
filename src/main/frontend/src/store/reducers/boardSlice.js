import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardSet: "tile5",
    pieceSet: "piece1",
    key: "Escape",
    isKeyPressed: false
  },
  reducers: {
    setPieceSet: (state, action) => {
      state.pieceSet = action.payload;
    },
    setBoardSet: (state, action) => {
      state.boardSet = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsKeyPressedTrue: (state, _) => {
      state.isKeyPressed = true;
    },
    setIsKeyPressedFalse: (state, _) => {
      state.isKeyPressed = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setPieceSet,
  setBoardSet,
  setKey,
  setIsKeyPressedTrue,
  setIsKeyPressedFalse
} = boardSlice.actions;

export default boardSlice.reducer;
