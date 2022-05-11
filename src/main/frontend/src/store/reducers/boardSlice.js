import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardSet: "tile5",
    pieceSet: "piece1",
    key: "Escape",
    confirmKey: "Enter",
    isKeyPressed: false,
    transcribedData: null
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
    setConfirmKey: (state, action) => {
      state.key = action.payload;
    },
    setIsKeyPressedTrue: (state, _) => {
      state.isKeyPressed = true;
    },
    setIsKeyPressedFalse: (state, _) => {
      state.isKeyPressed = false;
    },
    setTranscribedData: (state, action) => {
      state.key = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setPieceSet,
  setBoardSet,
  setKey,
  setConfirmKey,
  setIsKeyPressedTrue,
  setIsKeyPressedFalse,
  setTranscribedData
} = boardSlice.actions;

export default boardSlice.reducer;
