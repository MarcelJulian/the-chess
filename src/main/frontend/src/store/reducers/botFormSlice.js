import { createSlice } from "@reduxjs/toolkit";

export const botFormSlice = createSlice({
  name: "botForm",
  initialState: {
    strength: 1,
    color: "random",
    timeControlMode: "unlimited",
    timeControlMinute: 10,
    timeControlIncrement: 0
  },
  reducers: {
    setStrength: (state, action) => {
      state.strength = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setTimeControlMode: (state, action) => {
      state.timeControlMode = action.payload;
    },
    setTimeControlMinute: (state, action) => {
      state.timeControlMinute = action.payload;
    },
    setTimeControlIncrement: (state, action) => {
      state.timeControlIncrement = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setStrength,
  setColor,
  setTimeControlMode,
  setTimeControlMinute,
  setTimeControlIncrement
} = botFormSlice.actions;

export default botFormSlice.reducer;
