import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardSet: "tile5",
    pieceSet: "piece1",
    sound: ""
  },
  reducers: {
    setPieceSet: (state, action) => {
      state.pieceSet = action.payload;
    },
    setBoardSet: (state, action) => {
      state.boardSet = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPieceSet, setBoardSet } = boardSlice.actions;

export default boardSlice.reducer;
