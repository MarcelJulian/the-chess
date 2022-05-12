import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    boardSet: "tile5",
    pieceSet: "piece1",
    isSpeech: true,
    isBlind: false,
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
    setIsSpeech: (state, action) => {
      state.isSpeech = action.payload;
    },
    setIsBlind: (state, action) => {
      state.isBlind = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setConfirmKey: (state, action) => {
      state.confirmKey = action.payload;
    },
    setIsKeyPressedTrue: (state, _) => {
      state.isKeyPressed = true;
    },
    setIsKeyPressedFalse: (state, _) => {
      state.isKeyPressed = false;
    },
    setTranscribedData: (state, action) => {
      state.transcribedData = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setPieceSet,
  setBoardSet,
  setIsSpeech,
  setIsBlind,
  setKey,
  setConfirmKey,
  setIsKeyPressedTrue,
  setIsKeyPressedFalse,
  setTranscribedData
} = settingsSlice.actions;

export default settingsSlice.reducer;
