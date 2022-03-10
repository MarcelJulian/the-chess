import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    tileSet: "",
    pieceSet: "",
    sound: ""
  },
  reducers: {
    setPieceSet: (state, action) => {
      state.pieceSet = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPieceSet } = boardSlice.actions;

export default boardSlice.reducer;
